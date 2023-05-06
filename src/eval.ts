const evalCache: Record<string, Function> = Object.create(null);

export const evaluate = (scope: any, exp: string, el?: Node) => {
  try {
    return execute(scope, `return(${exp})`, el)
  } catch (error) {
    console.error(scope, exp, el, error)
  }
};

export const execute = (scope: any, exp: string, el?: Node) => {
  const fn = evalCache[exp] || (evalCache[exp] = toFunction(exp))
  try {
    return fn(scope, el)
  } catch (e) {
    if (import.meta.env.DEV) {
      console.warn(`Scope:`, JSON.stringify(scope))
      console.warn(`el:`, el)
      console.warn(`Error when evaluating expression "${exp}":`)
    }
    console.error(e)
  }
};

const toFunction = (exp: string): Function => {
  try {
    return new Function(`$data`, `$el`, `with($data){${exp}}`)
  } catch (e) {
    console.error(`${(e as Error).message} in expression: ${exp}`)
    return () => {}
  }
};
