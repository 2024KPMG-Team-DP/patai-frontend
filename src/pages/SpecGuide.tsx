import { SpecGuideContextProvider } from "../contexts/SpecGuideContext";
import SpecGuide from "../templates/SpecGuide";

export default function SpecGuidePage() {
  return (
    <SpecGuideContextProvider>
      <SpecGuide />
    </SpecGuideContextProvider>
  );
}
