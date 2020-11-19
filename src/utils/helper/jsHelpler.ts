/**
 * 从Object删除指定的字段，返回删除后的Object
 * @param source 原对象
 * @param keys 需要删除的keys数组
 */
export function removeObjectKeys(source: object, keys: Array<string>) {
  keys.forEach(item => {
    if (source[item]) {
      delete source[item];
    }
  });

  return source;
}