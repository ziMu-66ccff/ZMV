export function bfs(root: any, callback: (...arr: any[]) => any) {
  const discovered = [root];
  while (discovered.length) {
    const node = discovered.pop();
    callback(node);
    discovered.push(...(node.children || []));
  }
}

export function descendants(root: any) {
  const nodes: any[] = [];
  const push = (d: any) => nodes.push(d);
  bfs(root, push);
  return nodes;
}
