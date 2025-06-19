import React from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CustomLoading({ loading }) {
  return (
    <div>
      <AlertDialog open={loading}>
        <AlertDialogContent className="bg-white" >
          <div className="bg-white flex flex-col items-center m-10 justify-content-center">
            <Image src={'/progress.gif'} width={100} height={100} />
            <h2> Generating Your video... Do not Refresh</h2>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
