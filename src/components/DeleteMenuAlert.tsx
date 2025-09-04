import { useState, type ReactNode } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMenu } from "@/http/menu/delete-menu"
import { toast } from "sonner"

interface IDeleteMenuAlert {
    menu_id:string
    children:ReactNode
}

export const DeleteMenuAlert = ({children,menu_id}:IDeleteMenuAlert) => {
const queryClient = useQueryClient()
const [open,setOpen] = useState(false)

const { mutateAsync: deleteMenuFn } = useMutation({
    mutationFn: ()=> deleteMenu({menu_id}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-menus"] });
      setOpen(false)
      toast.success("📩 O Menu foi deletado com sucesso!");
     
    },
    onError: (error: ErrorResponse) => {
      error.map((err) => toast.error(err.message));
    },
  });

  const onDeleteMenu = async () => {
   await deleteMenuFn();
  };

   

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
  <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
      <AlertDialogDescription>
        Esta ação não pode ser desfeita. Isso excluirá permanentemente seu menu
e removerá seus dados de nossos servidores.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={onDeleteMenu}>Continuar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}
