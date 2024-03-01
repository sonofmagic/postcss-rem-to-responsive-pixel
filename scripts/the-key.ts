// decl.value = decl.value.replaceAll(/(\d*\.?\d+)rem/g, (m, $1) => {
//   if (!$1) return m
//   const rems = Number.parseFloat($1)
//   const fixedVal = rems * 16
//   return fixedVal === 0 ? '0' : fixedVal + 'px'
// })
