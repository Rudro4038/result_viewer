export interface UploadedFileListItem {
    id: string;
    fileName: string;
    createdAt: Date;
}

export type UploadedFileList = UploadedFileListItem[];
