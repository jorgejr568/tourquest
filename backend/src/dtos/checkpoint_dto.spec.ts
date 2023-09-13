import { describe, it, expect } from "bun:test";
import { Checkpoint } from "./checkpoint_dto";

describe("dtos.checkpoint_dto.Checkpoint", () => {
  it("should create a dto", () => {
    const dto = new Checkpoint({
      id: "mock-id",
      title: "mock-title",
      description: "mock-description",
      image: "mock-image",
      latitude: 22,
      longitude: 23,
      rewards: [],
    });

    expect(dto.id).toEqual("mock-id");
    expect(dto.title).toEqual("mock-title");
    expect(dto.description).toEqual("mock-description");
    expect(dto.image).toEqual("mock-image");
    expect(dto.latitude).toEqual(22);
    expect(dto.longitude).toEqual(23);
    expect(dto.rewards).toEqual([]);
  });
});
