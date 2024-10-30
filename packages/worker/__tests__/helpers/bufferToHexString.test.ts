import { expect, test } from "bun:test";
import { bufferToHexString } from "../../helpers/bufferToHexString";

test("Test positive scenarios", () => {
  expect(
    bufferToHexString(new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04, 0x05])),
  ).toBe("000102030405");
  expect(bufferToHexString(new Uint8Array([0x00, 0x00, 0x00, 0x00]))).toBe(
    "00000000",
  );

  expect(bufferToHexString(new Uint8Array([0xff, 0xff, 0x00, 0x00]))).toBe(
    "ffff0000",
  );
});
