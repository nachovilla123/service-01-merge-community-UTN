import { commonEstablishments, commonMembers, commonServices } from "../mocks/community/community";
import { mergeCommunities } from "../service/mergeCommunities";

describe("mergeCommunities", () => {
  it("should merge two communities with common elements", () => {
    const community1 = {
      id: "101",
      name: "Comunidad 1",
      degreeOfConfidence: 0.9,
      members: [...commonMembers, { id: "4", name: "Miembro 4" }],
      interestingServices: [...commonServices, { id: "4", name: "Servicio 4" }],
      interestingEstablishments: [
        ...commonEstablishments,
        { id: "4", name: "Establecimiento 4" },
      ],
    };

    const community2 = {
      id: "102",
      name: "Comunidad 2",
      degreeOfConfidence: 0.9,
      members: [...commonMembers, { id: "5", name: "Miembro 5" }],
      interestingServices: [...commonServices, { id: "5", name: "Servicio 5" }],
      interestingEstablishments: [
        ...commonEstablishments,
        { id: "5", name: "Establecimiento 5" },
      ],
    };

    const mergedCommunity = mergeCommunities(community1, community2);

    // Verificar que los miembros se fusionaron sin duplicados
    expect(mergedCommunity.members).toHaveLength(5); // 4 miembros comunes + 1 nuevo miembro

    // Verificar que los servicios interesantes se fusionaron sin duplicados
    expect(mergedCommunity.interestingServices).toHaveLength(5); // 4 servicios comunes + 1 nuevo servicio

    // Verificar que los establecimientos interesantes se fusionaron sin duplicados
    expect(mergedCommunity.interestingEstablishments).toHaveLength(5); // 4 establecimientos comunes + 1 nuevo establecimiento
  });

  it("should not merge communities with different degrees of confidence", () => {
    const community1 = {
      id: "101",
      name: "Comunidad 1",
      degreeOfConfidence: 0.9,
      members: [...commonMembers, { id: "4", name: "Miembro 4" }],
      interestingServices: [...commonServices, { id: "4", name: "Servicio 4" }],
      interestingEstablishments: [
        ...commonEstablishments,
        { id: "4", name: "Establecimiento 4" },
      ],
    };

    const community2 = {
      id: "102",
      name: "Comunidad 2",
      degreeOfConfidence: 0.8, // Diferente grado de confianza
      members: [...commonMembers, { id: "5", name: "Miembro 5" }],
      interestingServices: [...commonServices, { id: "5", name: "Servicio 5" }],
      interestingEstablishments: [
        ...commonEstablishments,
        { id: "5", name: "Establecimiento 5" },
      ],
    };

    expect(() => mergeCommunities(community1, community2)).toThrowError(
      "Las comunidades no pueden mergearse."
    );
  });

  it("should not merge communities with no common members", () => {
    const community1 = {
      id: "101",
      name: "Comunidad 1",
      degreeOfConfidence: 0.9,
      members: [...commonMembers, { id: "4", name: "Miembro 4" }], // Sin miembros en común
      interestingServices: [...commonServices, { id: "4", name: "Servicio 4" }],
      interestingEstablishments: [
        ...commonEstablishments,
        { id: "4", name: "Establecimiento 4" },
      ],
    };

    const community2 = {
      id: "102",
      name: "Comunidad 2",
      degreeOfConfidence: 0.9,
      members: [], // Sin miembros en común
      interestingServices: [...commonServices, { id: "5", name: "Servicio 5" }],
      interestingEstablishments: [
        ...commonEstablishments,
        { id: "5", name: "Establecimiento 5" },
      ],
    };

    expect(() => mergeCommunities(community1, community2)).toThrowError(
      "Las comunidades no pueden mergearse."
    );
  });

  // Agregar más casos de prueba según sea necesario
});
