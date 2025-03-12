import { describe, expect, it } from "vitest";
import { applyMiddlewares } from "../applyMiddlewares";
import { jsonSchemaMiddleware } from "./jsonSchemaMiddleware";

describe("jsonSchemaMiddleware.test", () => {
  it("should word with schema declarations", () => {
    const code = `function Component() {
      const schema = {
        type: "object",
        properties: {
          name: {
            title: 'Name',
            type: "string",
            placeholder: 'Please enter',
            description: 'this is your name',
          },
          dateRange: {
            title: 'Date Range',
            type: "array",
            placeholder: ['start date', 'end date'],
            description: 'this is your date range',
          }
        },
      };
      const schema2 = {
        type: "object",
        properties: {
          age: {
            title: 'Age',
            type: "number",
            widget: 'NumberInput',
            placeholder: 'Please enter',
          },
          fullName: {
            title: 'Full Name',
            type: 'object',
            properties: {
              firstName: {
                title: 'First Name',
                type: 'string',
                placeholder: 'Please enter',
              },
              lastName: {
                title: 'Last Name',
                type: 'string',
                placeholder: 'Please enter',
              },
            },
          },
        },
      };
      return null;
    }`;

    const expected = `function Component() {
      const schema = {
        type: "object",
        properties: {
          name: {
            title: t("Component.schema.properties.name.title"),
            type: "string",
            placeholder: t("Component.schema.properties.name.placeholder"),
            description: t("Component.schema.properties.name.description"),
          },
          dateRange: {
            title: t("Component.schema.properties.dateRange.title"),
            type: "array",
            placeholder: [t("Component.schema.properties.dateRange.placeholder.0"), t("Component.schema.properties.dateRange.placeholder.1")],
            description: t("Component.schema.properties.dateRange.description"),
          }
        },
      };
      const schema2 = {
        type: "object",
        properties: {
          age: {
            title: t("Component.schema2.properties.age.title"),
            type: "number",
            widget: "NumberInput",
            placeholder: t("Component.schema2.properties.age.placeholder"),
          },
          fullName: {
            title: t("Component.schema2.properties.fullName.title"),
            type: "object",
            properties: {
              firstName: {
                title: t("Component.schema2.properties.fullName.properties.firstName.title"),
                type: "string",
                placeholder: t("Component.schema2.properties.fullName.properties.firstName.placeholder"),
              },
              lastName: {
                title: t("Component.schema2.properties.fullName.properties.lastName.title"),
                type: "string",
                placeholder: t("Component.schema2.properties.fullName.properties.lastName.placeholder"),
              },
            },
          },
        },
      };
      return null;
    }`;
    const [actual] = applyMiddlewares(code, [jsonSchemaMiddleware]);
    expect(actual).toBe(expected);
  });

  it("should work with jsx attribute schema", () => {
    const code = `function Component() {
      return <FormRender schema={{
        type: 'object',
        properties: {
          name: {
            title: 'Name',
            type: 'string',
            placeholder: 'Please enter',
            description: 'this is your name',
          },
          dateRange: {
            title: 'Date Range',
            type: 'array',
            placeholder: ['start date', 'end date'],
            description: 'this is your date range',
          }
        },
      }} />;
    }`;

    const expected = `function Component() {
      return (
        <FormRender schema={{
          type: "object",
          properties: {
            name: {
              title: t("Component.FormRender.schema.properties.name.title"),
              type: "string",
              placeholder: t("Component.FormRender.schema.properties.name.placeholder"),
              description: t("Component.FormRender.schema.properties.name.description"),
            },
            dateRange: {
              title: t("Component.FormRender.schema.properties.dateRange.title"),
              type: "array",
              placeholder: [t("Component.FormRender.schema.properties.dateRange.placeholder.0"), t("Component.FormRender.schema.properties.dateRange.placeholder.1")],
              description: t("Component.FormRender.schema.properties.dateRange.description"),
            }
          },
        }} />
      );
    }`;

    const [actual] = applyMiddlewares(code, [jsonSchemaMiddleware]);
    expect(actual).toBe(expected);
  });

  it("should work with `defineProperties`", () => {
    const code = `function Component() {
      return <><PageContainer><h1>title</h1><div className="container"><FormRender schema={{
        type: 'object',
        properties: defineProperties({
          name: {
            title: 'Name',
            type: 'string',
            placeholder: 'Please enter',
            description: 'this is your name',
          },
          dateRange: {
            title: 'Date Range',
            type: 'array',
            placeholder: ['start date', 'end date'],
            description: 'this is your date range',
          }
        }),
      }} /></div></PageContainer></>;
    }`;
    const expected = `function Component() {
      return (
        <><PageContainer><h1>title</h1><div className="container"><FormRender schema={{
          type: "object",
          properties: defineProperties({
            name: {
              title: t("Component.PageContainer.FormRender.schema.properties.name.title"),
              type: "string",
              placeholder: t("Component.PageContainer.FormRender.schema.properties.name.placeholder"),
              description: t("Component.PageContainer.FormRender.schema.properties.name.description"),
            },
            dateRange: {
              title: t("Component.PageContainer.FormRender.schema.properties.dateRange.title"),
              type: "array",
              placeholder: [t(
                "Component.PageContainer.FormRender.schema.properties.dateRange.placeholder.0"
              ), t(
                "Component.PageContainer.FormRender.schema.properties.dateRange.placeholder.1"
              )],
              description: t(
                "Component.PageContainer.FormRender.schema.properties.dateRange.description"
              ),
            }
          }),
        }} /></div></PageContainer></>
      );
    }`;

    const [actual, values] = applyMiddlewares(code, [jsonSchemaMiddleware]);
    expect(actual).toBe(expected);
  });
});
