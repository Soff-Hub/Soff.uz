import { SizeType } from '~/shared/types/size';

export type OrderFilesProps = {
    order: any;
    orderFiles: any;
    isOrderFilesFetching?: boolean;
    withCollapse?: boolean;
    size?: SizeType;
} & (
    | { isCompletedFiles: true; isPendingFiles?: undefined }
    | {
          isPendingFiles: true;
          isCompletedFiles?: undefined;
          setSelectedOrder: (order: any) => void;
          setRes: (res: string) => void;
          setFeedbackOpen: (open: boolean) => void;
      }
);

export type PendingFilesCase = Extract<
    OrderFilesProps,
    { isPendingFiles: true }
> & {
    size?: SizeType;
};

export type CompletedFilesCase = Extract<
    OrderFilesProps,
    { isCompletedFiles: true }
> & { size?: SizeType };
