export const unique = (
  table = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&*+-=^~?@ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｵﾝｧｨｩｪｫｯｬｭｮ'
) => {
  let random = BigInt(0)
  for (let i = 0; i < 4; i++)
    random = (random << BigInt(31)) | BigInt(Math.floor(Math.random() * 0x7fffffff))
  random &= (BigInt(1) << BigInt(122)) - BigInt(1)
  const base = BigInt(table.length)
  const result = []
  while (random > BigInt(0)) {
    const index = random % base
    result.push(table[Number(index)])
    random = random / base
  }
  return result.reverse().join('')
}

export const anyObject = () => {
  const handler = {
    get(target, prop) {
      if (!(prop in target)) target[prop] = new Proxy(() => target, handler)
      return target[prop]
    },
    apply(target) {
      return target
    }
  }
  return new Proxy({}, handler) as any
}
