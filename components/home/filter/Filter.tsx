import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useColors } from 'hooks/useColors';

import CustomBackdrop from './CustomBackdrop';
import FilterView from './FilterView';

export default function Filter({ bottomSheetModalRef }: { bottomSheetModalRef: React.MutableRefObject<BottomSheetModal | null> }) {
    const { background, primary } = useColors();

    return (
        <BottomSheetModal
            index={0}
            snapPoints={['80%']}
            ref={bottomSheetModalRef}
            backdropComponent={(props) => <CustomBackdrop {...props} />}
            backgroundStyle={{ backgroundColor: background }}
            handleIndicatorStyle={{ backgroundColor: primary }}>
            <FilterView />
        </BottomSheetModal>
    );
}
