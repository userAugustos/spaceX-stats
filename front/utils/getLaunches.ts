import {listLaunches} from "@/types";

export async function getLaunches(searchTerm?: string, currentPage?: number, limit: number = 5): Promise<listLaunches> {
  let url = `http://192.168.100.32:3030/launches?`

  if (searchTerm) {
    url += `&search=${searchTerm}`;
  }
  if(currentPage){
    url += `&page=${currentPage}`;
  }
  if(limit){
    url += `&limit=${limit}`;
  }
	let res204: listLaunches | undefined = undefined;

	try {
		const res = await fetch(url,{ cache: 'force-cache' }).then(res => {
			if(res.status === 204){
				res204 = {
					results: [],
					limit: limit,
					totalDocs: 0,
					page: 0,
					totalPages: 0,
					hasNext: false,
					hasPrev: false
				}
			}
			if (!res.ok) {
				throw new Error('Failed to fetch data')
			}
			return res
		}).then<listLaunches>(res => res.json())

		return res204 || res
	} catch (error: any) {
		throw new Error('Failed to fetch data', error)
	}
  
}
