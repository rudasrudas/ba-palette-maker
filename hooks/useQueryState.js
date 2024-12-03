import { usePathname, useRouter, useSearchParams } from "next/navigation"

const useQueryState = (key, defaultToHide) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentParams = new URLSearchParams(Array.from(searchParams.entries()))
    const currentValue = currentParams.get(key)

    const setValue = (value) => {
        // Prevent unnecessary updates
        if(value === currentValue) return

        const currentParams = new URLSearchParams(Array.from(searchParams.entries()))

        if(defaultToHide !== value && value && typeof value === 'string')
            currentParams.set(key, value)
        else 
            currentParams.delete(key)

        
            if(key === 'mode') console.log(key, value, defaultToHide, currentParams.toString())

        const search = currentParams.toString()
        const query = search ? `?${search}` : ""
        router.push(`${pathname}${query}`, { shallow: true, scroll: false })
    }

    return [currentValue, setValue]
}
export default useQueryState