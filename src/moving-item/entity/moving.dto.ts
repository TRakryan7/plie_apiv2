export class MovingHeaderDto {
  documentCode: string;
  period: number;
  total: number;
  note: string;
  warehouseId: string;
  createdBy: string;
  updatedBy: string;
  detail: [
    {
      itemDescription: string;
      size: string;
      category: string;
      color: string;
      total: number;
      note: string;
      shelvesId: string;
      movingHeaderId: string;
      itemId: string;
      rowsId: string;
      period: number;
      createdBy: string;
      updatedBy: string;
    },
  ];
}

export class MovingDetailDto {
  itemDescription: string;
  size: string;
  category: string;
  color: string;
  total: number;
  movingHeaderId: string;
  shelvesId: string;
  itemId: string;
  rowsId: string;
  period: number;
  createdBy: string;
  updatedBy: string;
}
