import { DtoTransformerService } from "./dto-transformer.service";

describe("DtoTransformerService", () => {
  let service = new DtoTransformerService();

  it("should transform string property into patch operation", () => {
    const dto = {
      name: "new-name"
    };

    const expectedPatch = [
      {
        op: "replace",
        path: "/name",
        value: "new-name",
      }
    ];

    const patch = service.transformDtoToPatchOperation(dto);

    expect(patch).toEqual(expectedPatch);
  });

  it("should transform integer property into patch operation", () => {
    const dto = {
      age: 30,
    };

    const expectedPatch = [
      {
        op: "replace",
        path: "/age",
        value: 30,
      }
    ];

    const patch = service.transformDtoToPatchOperation(dto);

    expect(patch).toEqual(expectedPatch);
  });

  it("should transform complex property into patch operation", () => {
    const dto = {
      contact: {
        address: "123 street abc",
        version: 1,
        active: true
      }
    };

    const expectedPatch = [
      {
        op: "replace",
        path: "/contact",
        value: {
          address: "123 street abc",
          version: 1,
          active: true
        }
      }
    ];

    const patch = service.transformDtoToPatchOperation(dto);

    expect(patch).toEqual(expectedPatch);
  });

  it("should transform a full dto into patch operations", () => {
    const dto = {
      name: "new-name",
      age: 30,
      contact: {
        address: "123 street abc",
        version: 1,
        active: true
      }
    };

    const expectedPatch = [
      {
        op: "replace",
        path: "/name",
        value: "new-name",
      },
      {
        op: "replace",
        path: "/age",
        value: 30,
      },
      {
        op: "replace",
        path: "/contact",
        value: {
          address: "123 street abc",
          version: 1,
          active: true
        }
      }
    ];

    const patch = service.transformDtoToPatchOperation(dto);

    expect(patch).toEqual(expectedPatch);
  });

  it("should transform a full dto into patch operations exploring all nested properties", () => {
    const dto = {
      name: "new-name",
      age: 30,
      contact: {
        address: "123 street abc",
        version: 1,
        active: true
      }
    };

    const expectedPatch = [
      {
        op: "replace",
        path: "/name",
        value: "new-name"
      },
      {
        op: "replace",
        path: "/age",
        value: 30
      },
      {
        op: "replace",
        path: "/contact/address",
        value: "123 street abc"
      },
      {
        op: "replace",
        path: "/contact/version",
        value: 1
      },
      {
        op: "replace",
        path: "/contact/active",
        value: true
      }
    ];

    const patch = service.transformDtoToPatchOperation(dto, true);

    expect(patch).toEqual(expectedPatch);
  });

});
