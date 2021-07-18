import { SetMetadata } from "@nestjs/common";

//Each endpoint is secured with an athentication guard
//In order to bypass that guard, endpoints need to be decorated with the "@IsPuclic()" metadata

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)