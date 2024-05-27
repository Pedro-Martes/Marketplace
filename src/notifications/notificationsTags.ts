import { ItemClick } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";
import { OneSignal } from "react-native-onesignal";


export function tagUserInfoCreate(nome?: string, email?: string){
   OneSignal.User.addTags({
      nome: nome,
      email: email,
   });
}


export function tagCartUpdate(itemLiked: string){
   OneSignal.User.addTag('Item_liked', itemLiked)
}