import React from 'react';
import {Text} from 'react-native';
import {useTranslation} from "@/app/hooks/languageContext";

interface MenuProps {
    onNavigate: (screen: 'connect') => void;
}

const Menu: React.FC<MenuProps> = ({onNavigate}) => {
    const { trad } = useTranslation();

    return (
        <Text>BLALBLALBLBLLBA</Text>
    );
}

export default Menu;