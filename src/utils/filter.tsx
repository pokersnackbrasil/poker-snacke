export function filtrarBlinds(json: Record<string, any>,chavesDesejadas:string[]): Record<string, any> { 
 return Object.keys(json)
   .filter((key) => chavesDesejadas.includes(key))
   .reduce((obj, key) => {
     obj[key] = json[key];
     return obj;
   }, {} as Record<string, any>);
}
