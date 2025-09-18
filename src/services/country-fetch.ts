import { useQuery } from "@tanstack/react-query";
import { getRequest } from "./apibase";

type CountryOption = {
  code: string;
  name: string;
  prefix: string;
};

export function useCountries() {
  return useQuery<CountryOption[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const data = await getRequest(
        "https://restcountries.com/v3.1/all?fields=name,cca2,idd",
        {}
      );

      return (data ?? [])
        .map((c: any) => ({
          code: c.cca2,
          name: c.name.common,
          prefix: c.idd.root + (c.idd.suffixes?.[0] ?? ""),
        }))
        .sort((a: any, b: any) => a.name.localeCompare(b.name));
    },
    staleTime: 1000 * 60 * 60, // 1 h cache
  });
}
