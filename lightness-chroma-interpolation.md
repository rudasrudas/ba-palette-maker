
Iterate through all count possibilities
Create a possible variation for all colors inserted into different count interval positions*
* For chroma their order should be from lowest to highest or highest to lowest
* For lightness it must be from lowest to highest

Non-advanced calculations:
Discard any that would put the full range of chroma or lightness outside of its limits
Discard any that in their arrangement cannot follow a straight distribution path with a 0.0004 tolerance for either chroma or lightness
For the remaining ones, retrieve the range


////////////////

Iterate through each possible color count
    Iterate through possible value positions
    (value difference between two colors divided by their interpolated distance should be above x threshold)
    (restrained by given info, such as lightness should be from darkest to lightest, while chroma is indifferent)
    (lightness x chroma combinations too)
        [0] Pick random value from min to max twice, and make that the range
        [1] Set interpolation distance to random number between 0 and max number that would still allow for staying in range
        [2] Validate if full color count would be in the value limit range
        [3] Define distribution control points 

