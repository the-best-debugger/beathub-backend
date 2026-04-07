export function encodeCursor(id) {
  return Buffer.from(id).toString('base64');
}

export function decodeCursor(cursor) {
  return Buffer.from(cursor, 'base64').toString('ascii');
}
