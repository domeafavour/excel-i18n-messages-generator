import { describe, expect, it } from "vitest";
import { applyMiddlewares } from "../applyMiddlewares";
import { antdTableColumnsMiddleware } from "./antdTableColumnsMiddleware";

describe("antdTableColumnsMiddleware.test", () => {
  it("should work with jsx attribute", () => {
    const code = `
    import { Table } from "antd";
    
    export function MyTable() {
      const array = [{ name: 'john doe' }]
      return <Table columns={[
        {
          key: "name",
          dataIndex: "name",
          title: "Name",
        },
        {
          dataIndex: "age",
          title: "Age",
        },
        {
          dataIndex: "address",
          title: "Address",
        },
      ]} />
    }
    `;
    const expected = `
    import { Table } from "antd";
    
    export function MyTable() {
      const array = [{ name: 'john doe' }]
      return (
        <Table columns={[
          {
            key: "name",
            dataIndex: "name",
            title: t("MyTable.Table.columns.name.title"),
          },
          {
            dataIndex: "age",
            title: t("MyTable.Table.columns.age.title"),
          },
          {
            dataIndex: "address",
            title: t("MyTable.Table.columns.address.title"),
          },
        ]} />
      );
    }
    `;
    const [actual] = applyMiddlewares(code, [antdTableColumnsMiddleware]);
    expect(actual).toBe(expected);
  });

  it("should work with variable declaration", () => {
    const code = `
    import { Table } from "antd";
    
    export function MyTable() {
      const tableColumns = [
        {
          key: "myName",
          dataIndex: "name",
          title: "Name",
        },
        {
          dataIndex: "age",
          title: "Age",
        },
        {
          dataIndex: "address",
          title: "Address",
        },
      ];
      return <Table columns={tableColumns} />;
    }
    `;
    const expected = `
    import { Table } from "antd";
    
    export function MyTable() {
      const tableColumns = [
        {
          key: "myName",
          dataIndex: "name",
          title: t("MyTable.tableColumns.myName.title"),
        },
        {
          dataIndex: "age",
          title: t("MyTable.tableColumns.age.title"),
        },
        {
          dataIndex: "address",
          title: t("MyTable.tableColumns.address.title"),
        },
      ];
      return <Table columns={tableColumns} />;
    }
    `;
    const [actual] = applyMiddlewares(code, [antdTableColumnsMiddleware]);
    expect(actual).toBe(expected);
  });

  it("should work with `defineColumns` function", () => {
    const code = `
    import { Table } from "antd";
    
    export function MyTable() {
      const tableColumns = defineColumns([
        {
          key: "myName",
          dataIndex: "name",
          title: "Name",
        },
        {
          dataIndex: "age",
          title: "Age",
        },
        {
          dataIndex: "address",
          title: "Address",
        },
      ]);
      return <Table columns={tableColumns} />;
    }
    `;
    const expected = `
    import { Table } from "antd";
    
    export function MyTable() {
      const tableColumns = defineColumns([
        {
          key: "myName",
          dataIndex: "name",
          title: t("MyTable.tableColumns.myName.title"),
        },
        {
          dataIndex: "age",
          title: t("MyTable.tableColumns.age.title"),
        },
        {
          dataIndex: "address",
          title: t("MyTable.tableColumns.address.title"),
        },
      ]);
      return <Table columns={tableColumns} />;
    }
    `;
    const [actual] = applyMiddlewares(code, [antdTableColumnsMiddleware]);
    expect(actual).toBe(expected);
  });
});
