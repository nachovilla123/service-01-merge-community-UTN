
import { CommunityMember } from "./communityMember";
import { InterestingEstablishment } from "./interestingEstablishment";
import { InterestingService } from "./interestingServices";

export type Community = {
  id: string;
  name: string;
  degreeOfConfidence : number;
  members: CommunityMember[];
  interestingServices: InterestingService[];
  interestingEstablishments : InterestingEstablishment[];
};
