import { TableProps, Table as TableAntd } from "antd";

function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
    return <TableAntd {...props} />
}

export default Table