import chromaJs from "chroma-js"

export const CONTRAST_RATINGS = {
    GREAT: {
        value: 'great',
        rating: 7
    },
    GOOD: {
        value: 'good',
        rating: 4.5
    },
    BAD: {
        value: 'bad',
        rating: 0
    }
}

const useColorContrast = (baseColor, contrastColor) => {

    const contrast = baseColor && contrastColor ? chromaJs.contrast(baseColor, contrastColor) : 0
    
    const rateContrast = () => {
        if(contrast > CONTRAST_RATINGS.GREAT.rating) return CONTRAST_RATINGS.GREAT.value
        if(contrast > CONTRAST_RATINGS.GOOD.rating) return CONTRAST_RATINGS.GOOD.value
        return CONTRAST_RATINGS.BAD.value
    }

    return { contrast, contrastRating: rateContrast(), rateContrast }
}
export default useColorContrast