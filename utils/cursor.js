export function encodeCursor(value) {
  return Buffer.from(value.toString()).toString('base64');
}

export function decodeCursor(cursor) {
  return Buffer.from(cursor, 'base64').toString('utf-8');
}
