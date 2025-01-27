const competitions = [
    { competition: "LGT1", requirements: [], blocks: ["LGT2", "LGT3"] },
    { competition: "LGT2", requirements: ["LGT1"], blocks: ["LGT3"] },
    { competition: "LGT3", requirements: ["LGT2"], blocks: [] },
    { competition: "NW1", requirements: ["LGT1"], blocks: ["NW2", "NW3"] },
    { competition: "NW2", requirements: ["NW1", "LGT2"], blocks: ["NW3"] },
    { competition: "NW3", requirements: ["NW2", "LGT3"], blocks: [] },
    { competition: "S1K", requirements: ["LGT1"], blocks: ["S2K", "S3K"] },
    { competition: "S2K", requirements: ["S1K", "LGT2"], blocks: ["S3K"] },
    { competition: "S3K", requirements: ["S2K", "LGT3"], blocks: [] },
    { competition: "S1U", requirements: ["LGT1"], blocks: ["S2U", "S3U"] },
    { competition: "S2U", requirements: ["S1U", "LGT2"], blocks: ["S3U"] },
    { competition: "S3U", requirements: ["S2U", "LGT3"], blocks: [] },
    { competition: "S1E", requirements: ["LGT1"], blocks: ["S2E", "S3E"] },
    { competition: "S2E", requirements: ["S1E", "LGT2"], blocks: ["S3E"] },
    { competition: "S3E", requirements: ["S2E", "LGT3"], blocks: [] },
    { competition: "S1I", requirements: ["LGT1"], blocks: ["S2I", "S3I"] },
    { competition: "S2I", requirements: ["S1I", "LGT2"], blocks: ["S3I"] },
    { competition: "S3I", requirements: ["S2I", "LGT3"], blocks: [] },
    { competition: "Merker", requirements: [], blocks: [] },
  ];
  
  export default competitions;