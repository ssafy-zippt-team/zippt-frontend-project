import { api } from "@/api/authApi"

export function addSearchWord(searchWord){
    return api.post(
        "/api/v1/cache/search/word",
        searchWord,
        {
            headers: {
            "Content-Type": "text/plain"
            }
        }
    )
}

export function getSearched(){
    return api.get("/api/v1/cache/search/list")
}

export function deleteSearchedWord(searchWord) {
    return api.delete(
        `/api/v1/cache/search/word/${searchWord}`
    )
}