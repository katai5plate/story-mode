import { Alert, Box, Button, Grid2, Link, Stack } from '@mui/material'
import { Accord } from '@renderer/components/Accord'
import { Group } from '@renderer/components/Group'
import { ListForm } from '@renderer/components/ListForm'
import { SelectBox } from '@renderer/components/SelectBox'
import { Spacer } from '@renderer/components/Spacer'
import { TextInput } from '@renderer/components/TextInput'
import { useStore } from '@renderer/store/useStore'
import { ActorForm, CharacterHistory } from '@renderer/types/TemplateJSON'
import {
  appendNote,
  copy,
  detectEmptyItem,
  detectEmptyItems,
  textareaIsEmpty,
  toCombo,
  toTextArea
} from '@renderer/utils/helpers'
import { useAsk } from '@renderer/utils/useAsk'
import { useEditForm } from '@renderer/utils/useEditForm'
import { useNode } from '@renderer/utils/useNode'
import { useSave } from '@renderer/utils/useSave'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router'

const LIFE: Omit<ActorForm['experience']['life'][0], 'uid'> = {
  name: '',
  date: '',
  daily: [''],
  skills: [''],
  socialRelationships: [''],
  memo: ['']
}
const HISTORY: Omit<ActorForm['experience']['histories'][0], 'uid'> = {
  name: '',
  appearance: [''],
  personality: {
    ref: {
      categoryId: '',
      typeId: ''
    },
    basic: [''],
    different: [''],
    reason: ['']
  },
  weakness: {
    combox: '',
    content: ['']
  },
  desire: {
    detail: [''],
    motivation: {
      combox: '',
      content: ['']
    },
    sensitivity: {
      combox: '',
      content: ['']
    },
    likesAndDislikes: ['']
  },
  memo: ['']
}
const DIALOG: Omit<ActorForm['experience']['dialogExamples'][0], 'uid'> = {
  question: '',
  answer: [''],
  hint: ['']
}

const INIT: ActorForm = {
  dutyId: '',
  dutyDetail: [''],
  basic: {
    gender: '',
    genderDetail: [''],
    age: '',
    height: '',
    weight: '',
    fat: '',
    body: '',
    bodyDetail: ['']
  },
  experience: {
    life: [],
    histories: [],
    dialogExamples: []
  },
  appendix: {
    features: [''],
    memo: ['']
  }
}

export const ActorEdit = () => {
  const store = useStore()
  const node = useNode()
  const { form, getForm, setAllField, updateForm } = useEditForm<ActorForm>(node.actor || INIT)
  const save = useSave()
  const ask = useAsk()
  const location = useLocation()

  useEffect(() => {
    if (!store.nodes.length || !node.actor) return
    setAllField(node.actor)
  }, [location.pathname])

  useEffect(() => {
    save(() => {
      store.updateNode(node.uid, (p) => ({ ...p, actor: getForm() }))
      ask.popup('保存しました！', node.name)
    })
  }, [save, form])

  useEffect(() => {
    if (!store.isEditing && JSON.stringify(node.actor) !== JSON.stringify(form)) {
      store.setEditing(true)
    } else if (store.isEditing) {
      store.setEditing(false)
    }
  }, [node, form])

  const [bmi, setBmi] = useState('')
  const [body, setBody] = useState('')
  const [kcal, setKcal] = useState('')
  useEffect(() => {
    const data = [form.basic.age, form.basic.height, form.basic.weight, form.basic.fat]
    if (
      !data.every((x) => Number.isFinite(+x) && !Number.isNaN(+x)) ||
      !form.basic.gender.match(/^(男|女)性?$/)
    ) {
      setBmi('')
      setBody('')
      setKcal('')
      return
    }

    const isMan = !!form.basic.gender.match(/男/)
    const [age, height, weight, fat] = data.map(Number)

    // BMI 測定
    let bmi = NaN
    if (5 < age && age <= 15) {
      // ローレル指数 -> BMI
      const rohrer = ((weight * 1000) / height ** 3) * 10 ** 7
      bmi = (rohrer * height) / 10 ** 6
    } else {
      bmi = weight / (height / 100) ** 2
    }
    setBmi(`${bmi}`.replace(/\.(\d{2})\d+/, '.$1'))

    // 体型測定
    const { body } = store.template.actor.dictionaly
    const isInRange = (value: number, range: [number | null, number | null]): boolean => {
      const [min, max] = range
      return (min === null || value >= min) && (max === null || value < max)
    }
    const result = body.find((entry) => isInRange(bmi, entry.bmi) && isInRange(fat, entry.fat))
    setBody(result?.name || '')

    // 基礎代謝測定
    const a = isMan ? 13.397 : 9.247
    const b = isMan ? 4.799 : 3.098
    const c = isMan ? 5.677 : 4.33
    const d = isMan ? 88.362 : 447.593
    setKcal(`${`${a * weight + b * height - c * age + d}`.replace(/\.(\d{2})\d+/, '.$1')} kcal`)
  }, [form, setBmi, setBody, store.template.actor.dictionaly.body])

  const dutyRules = useMemo(
    () => store.template.actor.duty.find((x) => x.id === form.dutyId)?.questions,
    [store.template.actor.duty, form]
  )
  const dutyQuestions = useMemo(() => {
    const duty = store.template.actor.duty.find((x) => x.id === form.dutyId)?.name
    if (!duty) return ''
    return [
      `●「${duty}」設定の確認`,
      ...dutyRules.map((x) => appendNote(`Q. ${x}`, null, true))
    ].join('\n')
  }, [store.template.actor.duty, form.dutyId])

  const personalityType = useCallback(
    (item: CharacterHistory) =>
      store.template.actor.dictionaly.personality.find(
        (x) => x.id === item.personality.ref.categoryId
      )?.types,
    [store.template.actor.dictionaly.personality, form]
  )
  const personalityLink = useCallback(
    (item: CharacterHistory) =>
      personalityType(item)?.find((x) => x.id === item.personality.ref.typeId)?.link,
    [personalityType]
  )

  const appendPersonality = useCallback(
    (item: CharacterHistory) => (prev: string[]) => {
      const category = store.template.actor.dictionaly.personality.find(
        (x) => x.id === item.personality.ref.categoryId
      )
      const a = category?.name
      const b = category?.types.find((x) => x.id === item.personality.ref.typeId)?.name
      const text = appendNote(a, b)
      console.log({ text })
      return text !== '' ? (textareaIsEmpty(prev) ? [text] : [...prev, text]) : prev
    },
    [store.template.actor.dictionaly.personality]
  )

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size="grow">
          <TextInput label="名称" disable value={node.alias || node.name} />
        </Grid2>
        <Grid2 size="auto">
          <Button
            variant="outlined"
            onClick={async () => {
              const alias = await ask.prompt(
                '名前を決めてください。',
                node.alias || node.name,
                node.alias || node.name
              )
              if (!alias) return
              store.updateNode(node.uid, () => ({ alias }))
            }}
          >
            名称変更
          </Button>
        </Grid2>
      </Grid2>
      <SelectBox
        label="物語上の役割"
        value={form.dutyId}
        options={store.template.actor.duty}
        onChange={(id) => updateForm((r) => r.dutyId, id)}
      />
      {!dutyRules || !dutyRules?.length || (
        <Group float accord accordFill title="※ 役割設定の確認事項">
          <Grid2 container spacing={2}>
            <Grid2 size="grow">
              <ul>
                {dutyRules.map((rule, key) => (
                  <li key={key}>●&emsp;{rule}</li>
                ))}
              </ul>
            </Grid2>
            <Grid2 size="grow">
              <Button
                sx={{ verticalAlign: 'bottom' }}
                variant="outlined"
                fullWidth
                onClick={() => {
                  updateForm(
                    (r) => r.dutyDetail,
                    (prev) =>
                      dutyQuestions !== ''
                        ? textareaIsEmpty(prev)
                          ? [dutyQuestions]
                          : [...prev, dutyQuestions]
                        : prev
                  )
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                「役割詳細」に追記
              </Button>
              <Button
                sx={{ verticalAlign: 'bottom' }}
                variant="outlined"
                fullWidth
                onClick={() => copy(dutyQuestions)}
              >
                クリップボードにコピー
              </Button>
            </Grid2>
          </Grid2>
        </Group>
      )}
      <TextInput
        label="役割詳細"
        textarea
        value={form.dutyDetail}
        onChange={(text) => updateForm((r) => r.dutyDetail, toTextArea(text))}
      />
      <Group title="基本情報">
        <SelectBox
          label="性別"
          combo
          value={form.basic.gender}
          options={toCombo(store.template.actor.combox.gender)}
          onChange={(text) => updateForm((r) => r.basic.gender, text)}
        />
        <TextInput
          label="性別詳細"
          textarea
          value={form.basic.genderDetail}
          onChange={(text) => updateForm((r) => r.basic.genderDetail, toTextArea(text))}
        />
        <TextInput
          label="年齢"
          value={form.basic.age}
          onChange={(text) => updateForm((r) => r.basic.age, text)}
        />
        <TextInput
          label="身長"
          value={form.basic.height}
          onChange={(text) => updateForm((r) => r.basic.height, text)}
        />
        <TextInput
          label="体重"
          value={form.basic.weight}
          onChange={(text) => updateForm((r) => r.basic.weight, text)}
        />
        <TextInput
          label="体脂肪"
          value={form.basic.fat}
          onChange={(text) => updateForm((r) => r.basic.fat, text)}
        />
        <SelectBox
          label="体型"
          combo
          value={form.basic.body}
          options={store.template.actor.dictionaly.body}
          onChange={(text) => updateForm((r) => r.basic.body, text)}
        />
        <Accord
          fill
          title="※ 計算機"
          summary="年齢, 身長, 体重, 体脂肪 の数値入力で算出 (基礎代謝量は性別に '男' か '女' を指定することで算出)"
        >
          <Grid2 container spacing={2}>
            <Grid2 size="grow">
              <TextInput label="BMI" disable value={bmi} />
            </Grid2>
            <Grid2 size="grow">
              <TextInput label="体型" disable value={body} />
            </Grid2>
            <Grid2 size="grow">
              <TextInput label="基礎代謝量" disable value={kcal} />
            </Grid2>
          </Grid2>
          <Grid2 container spacing={2}>
            <Grid2 size="grow">
              <Button
                variant="outlined"
                fullWidth
                onClick={() => updateForm((r) => r.basic.body, body)}
              >
                「体型」を上書き
              </Button>
            </Grid2>
            <Grid2 size="grow">
              <Button
                variant="outlined"
                fullWidth
                onClick={() =>
                  updateForm(
                    (r) => r.basic.bodyDetail,
                    (prev) => {
                      const text = [
                        appendNote('BMI', bmi),
                        appendNote('体型', body),
                        appendNote('基礎代謝量', kcal)
                      ].join('\n')
                      return text !== '' ? (textareaIsEmpty(prev) ? [text] : [...prev, text]) : prev
                    }
                  )
                }
              >
                「体型詳細」に追記
              </Button>
            </Grid2>
          </Grid2>
        </Accord>
        <TextInput
          label="体型詳細"
          textarea
          value={form.basic.bodyDetail}
          onChange={(text) => updateForm((r) => r.basic.bodyDetail, toTextArea(text))}
        />
      </Group>
      <Group title="経験情報">
        <ListForm
          accord
          itemAccord
          title="日常"
          itemTitle={(item) => item.name || null}
          initItem={LIFE}
          onAddItem={(name) => ({ name })}
          updateForm={updateForm}
          list={form.experience.life}
          selector={(r: typeof form) => r.experience.life}
          accordItemAutoClose={(item) => detectEmptyItem(item, 'name')}
          render={(item, i) => (
            <>
              <TextInput
                label="日常名"
                value={item.name}
                onChange={(text) => updateForm((r) => r.experience.life[i].name, text)}
              />
              <TextInput
                label="いつ？"
                value={item.date}
                onChange={(text) => updateForm((r) => r.experience.life[i].date, text)}
              />
              <TextInput
                label="どんな？"
                textarea
                value={item.daily}
                onChange={(text) => updateForm((r) => r.experience.life[i].daily, toTextArea(text))}
              />
              <TextInput
                label="得られたもの"
                textarea
                value={item.skills}
                onChange={(text) =>
                  updateForm((r) => r.experience.life[i].skills, toTextArea(text))
                }
              />
              <TextInput
                label="社会的立ち位置"
                textarea
                value={item.socialRelationships}
                onChange={(text) =>
                  updateForm((r) => r.experience.life[i].socialRelationships, toTextArea(text))
                }
              />
              <TextInput
                label="メモ"
                textarea
                value={item.memo}
                onChange={(text) => updateForm((r) => r.experience.life[i].memo, toTextArea(text))}
              />
            </>
          )}
        />
        <ListForm
          accord
          itemAccord
          title="来歴"
          itemTitle={(item) => item.name || null}
          initItem={HISTORY}
          onAddItem={(name) => ({ name })}
          updateForm={updateForm}
          list={form.experience.histories}
          selector={(r: typeof form) => r.experience.histories}
          accordItemAutoClose={(item) =>
            detectEmptyItems(item, (x) => [
              [x.personality],
              [x.personality.ref],
              [x.weakness],
              [x.desire],
              [x.desire.motivation],
              [x.desire.sensitivity]
            ])
          }
          render={(item, i) => (
            <>
              <TextInput
                label="来歴名"
                value={item.name}
                onChange={(text) => updateForm((r) => r.experience.histories[i].name, text)}
              />
              <TextInput
                label="外見"
                textarea
                value={item.appearance}
                onChange={(text) =>
                  updateForm((r) => r.experience.histories[i].appearance, toTextArea(text))
                }
              />
              <Group
                accord
                title="性格"
                accordEmpty={() =>
                  detectEmptyItems(item, (x) => [[x.personality, 'name'], [x.personality.ref]])
                }
              >
                <Accord
                  fill
                  open
                  title="※ 性格パレット"
                  summary="性格診断のタイプから参考資料を索引"
                >
                  <Grid2 container spacing={2}>
                    <Grid2 size="grow">
                      <SelectBox
                        label="診断カテゴリ"
                        value={item.personality.ref.categoryId}
                        options={store.template.actor.dictionaly.personality}
                        onChange={(id) => {
                          updateForm(
                            (r) => r.experience.histories[i].personality.ref.categoryId,
                            id
                          )
                          updateForm((r) => r.experience.histories[i].personality.ref.typeId, '')
                        }}
                      />
                    </Grid2>
                    <Grid2 size="grow">
                      <SelectBox
                        label="診断タイプ"
                        value={item.personality.ref.typeId}
                        options={personalityType(item) ?? []}
                        onChange={(id) =>
                          updateForm((r) => r.experience.histories[i].personality.ref.typeId, id)
                        }
                      />
                    </Grid2>
                  </Grid2>
                  <Grid2 container spacing={2}>
                    <Grid2 size="grow">
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() =>
                          updateForm(
                            (r) => r.experience.histories[i].personality.basic,
                            appendPersonality(item)
                          )
                        }
                      >
                        「芯となる性格」に追記
                      </Button>
                    </Grid2>
                    <Grid2 size="grow">
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() =>
                          updateForm(
                            (r) => r.experience.histories[i].personality.different,
                            appendPersonality(item)
                          )
                        }
                      >
                        「実際のところ」に追記
                      </Button>
                    </Grid2>
                    <Grid2 size="grow">
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() =>
                          updateForm(
                            (r) => r.experience.histories[i].personality.reason,
                            appendPersonality(item)
                          )
                        }
                      >
                        「その理由」に追記
                      </Button>
                    </Grid2>
                  </Grid2>
                  <Box>
                    {(personalityLink(item) || []).map(({ name, href }, key) => (
                      <div key={key}>
                        {key === 0 && (
                          <>
                            <Spacer />
                            <label style={{ color: 'gray' }}>参考リンク</label>
                            <br />
                          </>
                        )}
                        <Link onClick={() => window.open(href)}>{name}</Link>
                        <br />
                      </div>
                    ))}
                  </Box>
                </Accord>
                <TextInput
                  label="芯となる性格"
                  textarea
                  value={item.personality.basic}
                  onChange={(text) =>
                    updateForm((r) => r.experience.histories[i].personality.basic, toTextArea(text))
                  }
                />
                <TextInput
                  label="実際のところ"
                  textarea
                  value={item.personality.different}
                  onChange={(text) =>
                    updateForm(
                      (r) => r.experience.histories[i].personality.different,
                      toTextArea(text)
                    )
                  }
                />
                <TextInput
                  label="その理由"
                  textarea
                  value={item.personality.reason}
                  onChange={(text) =>
                    updateForm(
                      (r) => r.experience.histories[i].personality.reason,
                      toTextArea(text)
                    )
                  }
                />
              </Group>
              <Group accord title="弱点" accordEmpty={() => detectEmptyItem(item.weakness, null)}>
                <SelectBox
                  label="内容"
                  combo
                  value={item.weakness.combox}
                  options={toCombo(store.template.actor.combox.weakness)}
                  onChange={(text) =>
                    updateForm((r) => r.experience.histories[i].weakness.combox, text)
                  }
                />
                <TextInput
                  label="詳細"
                  textarea
                  value={item.weakness.content}
                  onChange={(text) =>
                    updateForm((r) => r.experience.histories[i].weakness.content, toTextArea(text))
                  }
                />
              </Group>
              <Group
                accord
                title="欲望"
                accordEmpty={() =>
                  detectEmptyItems(item, (x) => [
                    [x.desire],
                    [x.desire.motivation],
                    [x.desire.sensitivity]
                  ])
                }
              >
                <Group title="モチベーション">
                  <SelectBox
                    label="内容"
                    combo
                    value={item.desire.motivation.combox}
                    options={toCombo(store.template.actor.combox.motivation)}
                    onChange={(text) =>
                      updateForm((r) => r.experience.histories[i].desire.motivation.combox, text)
                    }
                  />
                  <TextInput
                    label="詳細"
                    textarea
                    value={item.desire.motivation.content}
                    onChange={(text) =>
                      updateForm(
                        (r) => r.experience.histories[i].desire.motivation.content,
                        toTextArea(text)
                      )
                    }
                  />
                </Group>
                <Group title="感受性">
                  <SelectBox
                    label="方向性"
                    combo
                    value={item.desire.sensitivity.combox}
                    options={toCombo(store.template.actor.combox.sensitivity)}
                    onChange={(text) =>
                      updateForm((r) => r.experience.histories[i].desire.sensitivity.combox, text)
                    }
                  />
                  <TextInput
                    label="詳細"
                    textarea
                    value={item.desire.sensitivity.content}
                    onChange={(text) =>
                      updateForm(
                        (r) => r.experience.histories[i].desire.sensitivity.content,
                        toTextArea(text)
                      )
                    }
                  />
                </Group>
                <TextInput
                  label="好きなもの・嫌いなもの"
                  textarea
                  value={item.desire.likesAndDislikes}
                  onChange={(text) =>
                    updateForm(
                      (r) => r.experience.histories[i].desire.likesAndDislikes,
                      toTextArea(text)
                    )
                  }
                />
                <TextInput
                  label="その他"
                  textarea
                  value={item.desire.detail}
                  onChange={(text) =>
                    updateForm((r) => r.experience.histories[i].desire.detail, toTextArea(text))
                  }
                />
              </Group>
              <TextInput
                label="メモ"
                textarea
                value={item.memo}
                onChange={(text) =>
                  updateForm((r) => r.experience.histories[i].memo, toTextArea(text))
                }
              />
            </>
          )}
        />
        <ListForm
          accord
          title="台詞サンプル"
          initItem={DIALOG}
          updateForm={updateForm}
          list={form.experience.dialogExamples}
          selector={(r: typeof form) => r.experience.dialogExamples}
          accordItemAutoClose={(item) => detectEmptyItem(item, 'question')}
          itemTitle={(item) => item.question}
          render={(item, i) => (
            <>
              <SelectBox
                label="質問"
                combo
                value={item.question}
                options={toCombo(store.template.actor.combox.question)}
                onChange={(text) =>
                  updateForm((r) => r.experience.dialogExamples[i].question, text)
                }
              />
              <TextInput
                textarea
                label="回答"
                value={item.answer}
                onChange={(text) =>
                  updateForm((r) => r.experience.dialogExamples[i].answer, toTextArea(text))
                }
              />
              <TextInput
                textarea
                label="コツなどのメモ"
                value={item.hint}
                onChange={(text) =>
                  updateForm((r) => r.experience.dialogExamples[i].hint, toTextArea(text))
                }
              />
            </>
          )}
        />
      </Group>
      <Group title="その他">
        <TextInput
          textarea
          label="特徴"
          value={form.appendix.features}
          onChange={(text) => updateForm((r) => r.appendix.features, toTextArea(text))}
        />
        <TextInput
          textarea
          label="メモ"
          value={form.appendix.memo}
          onChange={(text) => updateForm((r) => r.appendix.memo, toTextArea(text))}
        />
      </Group>
      <Group accord accordEmpty={() => 'NOEMPTY'} title="デバッグ情報">
        <Box component="pre">{JSON.stringify(form, null, 2)}</Box>
      </Group>
    </>
  )
}
