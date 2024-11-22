import { NavigateFunction, Params, useNavigate, useParams } from 'react-router-dom'

export interface RoutingProps {
  navigate?: NavigateFunction,
  param?: Readonly<Params<string>>
}

export function useRoutingHooks<T>(props: T) : T & {
  navigate: NavigateFunction,
  params: Readonly<Params<string>>
} {
  return {
    ...props,
    navigate: useNavigate(),
    params: useParams(),
  }
}
