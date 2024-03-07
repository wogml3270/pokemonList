interface Page {
  results: {
    name: string;
    url: string;
  }[];
}

interface Data {
  pages: Page[];
}

interface FileterDataProps {
  data: Data | undefined;
  search: string;
}

const filterData = ({ data, search }: FileterDataProps) => {
  return (
    data?.pages.map((page: Page) => {
      return page.results.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.url.split('/').slice(-2, -1)[0].includes(search),
      );
    }) || []
  );
};

export default filterData;
