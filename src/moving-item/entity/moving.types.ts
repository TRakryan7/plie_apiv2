export type MovingParams = {
  documentCode: string;
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
      movingHeaderId: string;
      period: string;
      shelvesId: string;
      itemId: string;
      rowsId: string;
      createdBy: string;
      updatedBy: string;
    },
  ];
};

export type MovingDetailParams = {
  itemDescription: string;
  size: string;
  category: string;
  color: string;
  total: number;
  note: string;
  movingHeaderId: string;
  shelvesId: string;
  itemId: string;
  rowsId: string;
  period: string;
  createdBy: string;
  updatedBy: string;
};
