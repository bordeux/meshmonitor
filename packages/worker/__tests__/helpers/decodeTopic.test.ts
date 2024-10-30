import { expect, test } from "bun:test";
import { decodeTopic } from "../../helpers/decodeTopic";
import { RecordId } from "surrealdb";

test("Test channel decode", () => {
  expect(decodeTopic("/lorem/ipsum/2/e/MyChannel/!FFFFFFF")).toStrictEqual({
    channelName: "MyChannel",
    topic: "/lorem/ipsum/2/e/MyChannel/!FFFFFFF",
    type: "channel",
    node: new RecordId("node", "FFFFFFF"),
  });
});

test("Test mapReport decode", () => {
  expect(decodeTopic("/lorem/ipsum/2/map/")).toStrictEqual({
    channelName: "",
    topic: "/lorem/ipsum/2/map/",
    type: "mapReport",
    node: new RecordId("node", "ffffffff"),
  });
});

test("Test invalid channels decode", () => {
  expect(decodeTopic("/lorem/ipsum/2/MyChannel/!FFFFFFF")).toStrictEqual(null);
  expect(decodeTopic("/lorem/ipsum/2/e/MyChannel/FFFFFFF")).toStrictEqual(null);
  expect(decodeTopic("/lorem/ipsu/e/MyChannel/!FFFFFFF")).toStrictEqual(null);
  expect(decodeTopic("/lorem/ipsu/e/2/map")).toStrictEqual(null);
  expect(decodeTopic("/lorem/ipsum/2/map")).toStrictEqual(null);
});
