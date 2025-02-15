import { Box, Button, Grid2, Link } from '@mui/material'
import { Accord } from '@renderer/components/Accord'
import { Group } from '@renderer/components/Group'
import { ListForm } from '@renderer/components/ListForm'
import { SelectBox } from '@renderer/components/SelectBox'
import { TextInput } from '@renderer/components/TextInput'
import { useStore } from '@renderer/store/useStore'
import { Character, CharacterHistory } from '@renderer/types/TemplateJSON'
import { anyObject } from '@renderer/utils/helpers'
import { useSyncCurrent } from '@renderer/utils/hooks'
import { useEditForm } from '@renderer/utils/useEditForm'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'

// interface CharacterForm {
//   id: string
//   name: string
//   dutyId: string
//   basic: {
//     gender: string
//     genderDetail: string[]
//     age: number | string
//     height: number | string
//     weight: number | string
//     fat: number | string
//     body: string
//   }
//   experience: {
//     life: {
//       name: string
//       date: string
//       daily: string[]
//       skills: string[]
//       socialRelationships: string[]
//     }[]
//     histories: {
//       name: string
//       appearance: string[]
//       personality: {
//         ref: {
//           categoryId: string
//           typeId: string
//         }
//         basic: string[]
//         different: string[]
//         reason: string[]
//       }
//       weakness: {
//         combox: string
//         content: string[]
//       }
//       desire: {
//         detail: string[]
//         motivation: ComboxFields
//         sensitivity: ComboxFields
//         likesAndDislikes: string[]
//       }
//     }[]
//     dialogExamples: {
//       question: string
//       answer: string[]
//       hint: string[]
//     }[]
//   }
//   appendix: {
//     features: string[]
//     memo: string[]
//   }
// }

const LIFE: Omit<Character['experience']['life'][0], 'uid'> = {
  name: '',
  date: '',
  daily: [''],
  skills: [''],
  socialRelationships: [''],
  memo: ['']
}
const HISTORY: Omit<Character['experience']['histories'][0], 'uid'> = {
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

const INIT: Character = {
  id: '',
  name: '',
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

export const CharacterEdit = () => {
  const store = useStore()
  const location = useLocation()
  const syncCurrent = useSyncCurrent()
  const { form, setAllField, updateForm, itemControllers, toCombo, toTextArea } =
    useEditForm<Character>(INIT)

  useEffect(() => {
    syncCurrent(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    if (!store.currentRoute) return
    setAllField(store.template.character.preset.find((x) => x.id === store.currentRoute.path))
  }, [location.pathname, store.currentRoute])

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
    const { body } = store.template.character.dictionaly
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
  }, [form, setBmi, setBody, store.template.character.dictionaly.body])

  const dutyRules = useMemo(
    () => store.template.character.duty.find((x) => x.id === form.dutyId)?.rules,
    [store.template.character.duty, form]
  )
  const personalityType = useCallback(
    (item: CharacterHistory) =>
      store.template.character.dictionaly.personality.find(
        (x) => x.id === item.personality.ref.categoryId
      )?.types,
    [store.template.character.dictionaly.personality, form]
  )
  const personalityLink = useCallback(
    (item: CharacterHistory) =>
      personalityType(item)?.find((x) => x.id === item.personality.ref.typeId)?.link,
    [personalityType]
  )

  return (
    <Box>
      {/* <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {JSON.stringify([store.currentRoute, form], null, 2)}
      </pre> */}
      <TextInput label="ID" value={form.id} disable />
      <TextInput
        label="名前"
        value={form.name}
        onChange={(text) => updateForm((r) => r.name, text)}
      />
      <SelectBox
        label="物語上の役割"
        value={form.dutyId}
        options={store.template.character.duty}
        onChange={(id) => updateForm((r) => r.dutyId, id)}
      />
      {!dutyRules || !dutyRules?.length || (
        <Group label="※ 役割ルール">
          <ul>
            {dutyRules.map((rule, key) => (
              <li key={key}>●　{rule}</li>
            ))}
          </ul>
        </Group>
      )}
      <TextInput
        label="役割詳細"
        textarea
        value={form.dutyDetail}
        onChange={(text) => updateForm((r) => r.dutyDetail, toTextArea(text))}
      />
      <Group label="基本情報">
        <SelectBox
          label="性別"
          combo
          value={form.basic.gender}
          options={toCombo(store.template.character.combox.gender)}
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
          options={store.template.character.dictionaly.body}
          onChange={(text) => updateForm((r) => r.basic.body, text)}
        />
        <TextInput
          label="体型詳細"
          textarea
          value={form.basic.bodyDetail}
          onChange={(text) => updateForm((r) => r.basic.bodyDetail, toTextArea(text))}
        />
        <Accord
          title="※ BMI 計算機"
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
          <Button
            variant="outlined"
            fullWidth
            onClick={() => updateForm((r) => r.basic.body, body)}
          >
            「体型」を上書き
          </Button>
        </Accord>
      </Group>
      <Group label="経験情報">
        <ListForm
          title="日常"
          init={LIFE}
          updateForm={updateForm}
          list={form.experience.life}
          selector={(r: typeof form) => r.experience.life}
          render={(item, select) => (
            <>
              <TextInput
                label="日常名"
                value={item.name}
                onChange={(text) =>
                  updateForm(
                    select((r) => r.name),
                    text
                  )
                }
              />
              <TextInput
                label="いつ？"
                value={item.date}
                onChange={(text) =>
                  updateForm(
                    select((r) => r.date),
                    text
                  )
                }
              />
              <TextInput
                label="どんな？"
                textarea
                value={item.daily}
                onChange={(text) =>
                  updateForm(
                    select((r) => r.daily),
                    toTextArea(text)
                  )
                }
              />
              <TextInput
                label="得られたもの"
                textarea
                value={item.skills}
                onChange={(text) =>
                  updateForm(
                    select((r) => r.skills),
                    toTextArea(text)
                  )
                }
              />
              <TextInput
                label="社会的立ち位置"
                textarea
                value={item.socialRelationships}
                onChange={(text) =>
                  updateForm(
                    select((r) => r.socialRelationships),
                    toTextArea(text)
                  )
                }
              />
              <TextInput
                label="その他"
                textarea
                value={item.memo}
                onChange={(text) =>
                  updateForm(
                    select((r) => r.memo),
                    toTextArea(text)
                  )
                }
              />
            </>
          )}
        />
        <ListForm
          title="来歴と現在"
          init={HISTORY}
          updateForm={updateForm}
          list={form.experience.histories}
          selector={(r: typeof form) => r.experience.histories}
          render={(item, select) => (
            <>
              <TextInput
                label="来歴名"
                value={item.name}
                onChange={(text) =>
                  updateForm(
                    select((r) => r.name),
                    text
                  )
                }
              />
              <TextInput
                label="外見"
                textarea
                value={item.appearance}
                onChange={(text) =>
                  updateForm(
                    select((r) => r.appearance),
                    toTextArea(text)
                  )
                }
              />
              <Group label="性格">
                <Accord title="※ 辞書" summary="性格診断のタイプから参考資料を索引">
                  <SelectBox
                    label="診断カテゴリ"
                    value={item.personality.ref.categoryId}
                    options={store.template.character.dictionaly.personality}
                    onChange={(id) => {
                      updateForm(
                        select((r) => r.personality.ref.categoryId),
                        id
                      )
                      updateForm(
                        select((r) => r.personality.ref.typeId),
                        ''
                      )
                    }}
                  />
                  <SelectBox
                    label="診断タイプ"
                    value={item.personality.ref.typeId}
                    options={personalityType(item) ?? []}
                    onChange={(id) =>
                      updateForm(
                        select((r) => r.personality.ref.typeId),
                        id
                      )
                    }
                  />
                  <Box>
                    {(personalityLink(item) || []).map(({ name, href }, key) => (
                      <div key={key}>
                        {key === 0 && (
                          <>
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
              </Group>
            </>
          )}
        />
      </Group>
    </Box>
  )
}
