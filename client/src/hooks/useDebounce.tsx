import { useEffect, useState } from 'react'



export const useDebounce = (value: string, delay = 500) => {

    const [debouncedValue, setDebauncedValue] = useState<string | number>('')

    useEffect(() => {

        const id = setTimeout( () => {
            setDebauncedValue(value)
        }, delay )

        return () => {
            clearTimeout(id)
        }

    }, [value, delay])
    
    
  return debouncedValue.toString()
}
