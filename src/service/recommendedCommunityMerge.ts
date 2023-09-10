import { Community } from "../types/community";

export function recommendedCommunityMerge(communities: Community[]): { community1: Community, community2: Community }[] {
        const possibleMerges: { community1: Community, community2: Community }[] = [];
      
        // Iterar sobre todas las combinaciones de comunidades
        for (let i = 0; i < communities.length; i++) {
          for (let j = i + 1; j < communities.length; j++) {
            const community1 = communities[i];
            const community2 = communities[j];

            // Calcular el número de elementos que se superponen en interestingEstablishments
            const establishmentOverlap =
              community1.interestingEstablishments.filter((establishment1) =>
                community2.interestingEstablishments.includes(establishment1)
              ).length;

            // Calcular el número de elementos que se superponen en interetingServices
            const serviceOverlap = community1.interestingServices.filter(
              (service1) => community2.interestingServices.includes(service1)
            ).length;

          
            // Verificar si cumplen con los criterios
            if (
              establishmentOverlap /
                community1.interestingEstablishments.length >=
                0.75 &&
              serviceOverlap / community1.interestingServices.length >= 0.75 &&
              community1.degreeOfConfidence === community2.degreeOfConfidence &&
              community1.members.some((member1) =>
                community2.members.includes(member1)
              )
            ) {
              possibleMerges.push({ community1, community2 });
            }
          }
        }
      
        return possibleMerges;

}