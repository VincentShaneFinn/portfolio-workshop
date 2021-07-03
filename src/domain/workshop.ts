export function addOne(val: number | string) {
    if(typeof(val) == "string") return val + "two";
    return val + 1;
}