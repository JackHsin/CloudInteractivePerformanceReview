type Data = {
  id: string;
};

export type IrouterConfig = {
  key: string;
  title: string;
  pathname: string;
  data?: Data;
  pages?: string[];
};
