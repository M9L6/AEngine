export const Random = {
  randInt(low: number, high: number): number {
    return low + Math.floor(Math.random() * (high - low));
  },

  randFloat(low: number, high: number): number {
    return low + Math.random() * (high - low);
  },
};

export const epsilon = 0.00001;
