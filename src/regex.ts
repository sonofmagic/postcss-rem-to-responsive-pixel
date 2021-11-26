// excluding regex trick: http://www.rexegg.com/regex-best-trick.html

// Not anything inside double quotes
// Not anything inside single quotes
// Not anything inside url()
// Any digit followed by px
// !singlequotes|!doublequotes|!url()|pixelunit
export const remRegex = /"[^"]+"|'[^']+'|url\([^)]+\)|var\([^)]+\)|(\d*\.?\d+)rem/g

export const pxRegex =
  /"[^"]+"|'[^']+'|url\([^)]+\)|var\([^)]+\)|(\d*\.?\d+)px/g
