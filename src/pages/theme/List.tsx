import "react-quill-new/dist/quill.snow.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import APIErrorProvider from "../../components/fallback/APIErrorProvider";
import APILoadingProvider from "../../components/fallback/APILoadingProvider";
import Blank from "../../components/fallback/Blank";
import { Button } from "../../components/ui/button";
import { ThemeType } from "../../api/theme";
import UIErrorBoundary from "../../components/fallback/UIErrorBoundary";
import UploadForm from "./UploadForm";
import themeQueryOptions from "../../queries/themeQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function ThemeList() {
  return (
    <UIErrorBoundary>
      <APIErrorProvider>
        <APILoadingProvider>
          <ThemeListContent />
        </APILoadingProvider>
      </APIErrorProvider>
    </UIErrorBoundary>
  );
}

const ThemeListContent = () => {
  const [isOpenThemeUploadDialog, setIsOpenThemeUploadDialog] = useState(false);
  const { data } = useQuery({
    ...themeQueryOptions.getThemeList(),
  });

  return (
    <div>
      <div className="flex justify-between">
        <div>총 테마 수 {data?.themes.length}</div>
        <Dialog
          open={isOpenThemeUploadDialog}
          onOpenChange={setIsOpenThemeUploadDialog}
        >
          <DialogTrigger>
            <Button>테마 업로드하기</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>테마 업로드하기</DialogTitle>
              <DialogDescription className="flex flex-col justify-evenly">
                <UploadForm
                  onCloseFormDialog={() => {
                    setIsOpenThemeUploadDialog(false);
                  }}
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {data?.themes.length === 0 ? (
        <Blank />
      ) : (
        data?.themes.map((theme) => <ThemeListItem key={theme.id} {...theme} />)
      )}
    </div>
  );
};

type ThemeListItemProps = ThemeType;

const ThemeListItem = ({
  name,
  price,
  isActive,
  owned,
  url,
}: ThemeListItemProps) => {
  return (
    <div>
      <img src={url} alt={`${name} 테마 이미지`} />
      <div>
        <div>{price}원</div>
        <div>{isActive}</div>
        <div>{owned}</div>
      </div>
    </div>
  );
};
