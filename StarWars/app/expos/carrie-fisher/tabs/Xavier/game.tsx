import React, { useState, useEffect, useRef } from 'react';
import { View } from "react-native";
import styles_starwars from "@/styles/expo/carrie-fisher/starwars";
import { ImageBackground } from "expo-image";
import { formatTime } from "@/utils/expo/carrie-fisher/utils";
import Help from "@/app/expos/carrie-fisher/components/help";
import useTimer from "@/app/expos/carrie-fisher/hooks/useTimer";
import { Gyroscope } from 'expo-sensors';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import { scale, verticalScale } from '@/styles/responsive';
import ThemedText from '@/app/common/components/themedText';

interface GameProps {
    onWin: (id:number ,time: number) => void;
}

const BALL_SIZE = scale(20);
const MAX_SPEED = 4;

const Ball = (props: any) => {
    const { position } = props.body;
    return (
        <View style={{
            position: 'absolute',
            left: position.x - BALL_SIZE / 2,
            top: position.y - BALL_SIZE / 2,
            width: BALL_SIZE,
            height: BALL_SIZE,
            borderRadius: BALL_SIZE / 2,
            backgroundColor: '#F0A820',
            borderWidth: 2,
            borderColor: '#FFF'
        }} />
    );
};

const Wall = (props: any) => {
    const { position } = props.body;
    const { width: w, height: h } = props;
    return (
        <View style={{
            position: 'absolute', left: position.x - w / 2, top: position.y - h / 2,
            width: w, height: h, backgroundColor: 'rgba(255, 0, 0, 0.5)', borderColor: 'red', borderWidth: 1
        }} />
    );
};

const Goal = (props: any) => {
    const { position } = props.body;
    const { width: w, height: h, color } = props;
    return (
        <View style={{
            position: 'absolute', left: position.x - w / 2, top: position.y - h / 2,
            width: w, height: h, backgroundColor: color, borderColor: '#00FF00',
            borderWidth: 2, justifyContent: 'center', alignItems: 'center'
        }}>
            <ThemedText style={{ fontSize: scale(8), color: '#00FF00', fontWeight: 'bold' }}>GOAL</ThemedText>
        </View>
    );
};

const createWorld = (viewWidth: number, viewHeight: number) => {
    const engine = Matter.Engine.create({enableSleeping: false, positionIterations: 10, velocityIterations: 10});
    engine.gravity.scale = 0;
    const world = engine.world;
    const wallT = scale(20);
    const outerT = scale(30);

    const ball = Matter.Bodies.circle(outerT + scale(20), outerT + scale(20), BALL_SIZE / 2, {
        label: "Ball", frictionAir: 0.04, restitution: 0.3
    });

    const goalSize = scale(49);
    const goal = Matter.Bodies.rectangle(
        viewWidth - outerT - goalSize/2, viewHeight - outerT - goalSize/2,
        goalSize, goalSize, { label: "Goal", isStatic: true, isSensor: true }
    );

    const mazeWalls = [
        // external walls
        [viewWidth / 2, outerT / 2, viewWidth, outerT],
        [viewWidth / 2, viewHeight - outerT / 2, viewWidth, outerT],
        [outerT / 2, viewHeight / 2, outerT, viewHeight],
        [viewWidth - outerT / 2, viewHeight / 2, outerT, viewHeight],

        [viewWidth * 0.33, viewHeight * 0.15, viewWidth * 0.5, wallT],
        [viewWidth * 0.25, viewHeight * 0.15, wallT, viewHeight * 0.1],
        [viewWidth * 0.75, viewHeight * 0.15, viewWidth * 0.15, wallT],

        [viewWidth * 0.701, viewHeight * 0.2, wallT, viewHeight * 0.07],
        [viewWidth * 0.35, viewHeight * 0.25, viewWidth * 0.4, wallT],
        [viewWidth * 0.75, viewHeight * 0.25, viewWidth * 0.15, wallT],

        [viewWidth * 0.35, viewHeight * 0.3, wallT, viewHeight * 0.07],
        [viewWidth * 0.8, viewHeight * 0.366, wallT, viewHeight * 0.2],
        [viewWidth * 0.38, viewHeight * 0.35, viewWidth * 0.6, wallT],

        [viewWidth * 0.65, viewHeight * 0.5, wallT, viewHeight * 0.13],
        [viewWidth * 0.38, viewHeight * 0.45, viewWidth * 0.3, wallT],
        [viewWidth * 0.772, viewHeight * 0.58, viewWidth * 0.3, wallT],
        [viewWidth * 0.725, viewHeight * 0.45, viewWidth * 0.095, wallT],

        [viewWidth * 0.3, viewHeight * 0.58, wallT, viewHeight * 0.13],
        [viewWidth * 0.5, viewHeight * 0.615, wallT, viewHeight * 0.2],
        [viewWidth * 0.725, viewHeight * 0.75, wallT, viewHeight * 0.25],
        [viewWidth * 0.4, viewHeight * 0.63, viewWidth * 0.15, wallT],
        [viewWidth * 0.4, viewHeight * 0.699, viewWidth * 0.15, wallT],

        [viewWidth * 0.43, viewHeight * 0.78, viewWidth * 0.53, wallT],
        [viewWidth * 0.25, viewHeight * 0.78, wallT, viewHeight * 0.1],

        [viewWidth * 0.18, viewHeight * 0.88, wallT, viewHeight * 0.04],

        [viewWidth * 0.478, viewHeight * 0.859, viewWidth * 0.3, wallT],
        [viewWidth * 0.60, viewHeight * 0.914, wallT, viewHeight * 0.078],
        [viewWidth * 0.835, viewHeight * 0.859, viewWidth * 0.172, wallT],
    ];

    const walls = mazeWalls.map(wall => Matter.Bodies.rectangle(wall[0], wall[1], wall[2], wall[3], { isStatic: true }));
    Matter.World.add(world, [ball, goal, ...walls]);

    const entities: any = {
        physics: { engine, world },
        ball: { body: ball, renderer: <Ball /> },
        goal: { body: goal, width: goalSize, height: goalSize, color: 'rgba(0, 255, 0, 0.4)', renderer: <Goal /> },
    };

    walls.forEach((wall, index) => {
        entities[`wall${index}`] = { body: wall, width: mazeWalls[index][2], height: mazeWalls[index][3], renderer: <Wall /> };
    });

    return entities;
};

const Game: React.FC<GameProps> = ({ onWin }) => {
    const { elapsedTime, stopTimer } = useTimer(true);
    const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
    const [layout, setLayout] = useState<{ width: number; height: number } | null>(null);
    const engineRef = useRef<any>(null);

    useEffect(() => {
        Gyroscope.setUpdateInterval(16);
        const subscription = Gyroscope.addListener(data => setGyroData(data));
        return () => subscription.remove();
    }, []);

    const updatePhysics = (entities: any, { time }: any) => {
        const engine = entities.physics.engine;
        const ball = entities.ball.body;
        const goal = entities.goal.body;

        Matter.Body.applyForce(ball, ball.position, {x: gyroData.y * 0.004, y: gyroData.x * 0.004});

        let velocity = ball.velocity;
        let speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
        if (speed > MAX_SPEED) {
            let ratio = MAX_SPEED / speed;
            Matter.Body.setVelocity(ball, { x: velocity.x * ratio, y: velocity.y * ratio });
        }

        const subSteps = 2;
        const stepTime = time.delta / subSteps;
        for (let i = 0; i < subSteps; i++) {
            Matter.Engine.update(engine, stepTime);
        }

        if (Matter.Collision.collides(ball, goal)) handleWin();

        return entities;
    };

    const handleWin = () => {
        stopTimer();
        onWin(1, elapsedTime);
    };

    return (
        <ImageBackground
            source={require('@/assets/images/expos/carrieFisher/death_star.png')}
            style={styles_starwars.menuBackgroundImage}
        >
            <View style={styles_starwars.playingLucasTopBar}>
                <ThemedText style={styles_starwars.playingLucasTimerText} weight="bold">{formatTime(elapsedTime)}</ThemedText>
                <Help challengeId={1} theme={'light'} onSkip={onWin} />
            </View>

            <View
                style={{ flex: 1, marginBottom: verticalScale(20) }}
                onLayout={(e) => setLayout(e.nativeEvent.layout)}
            >
                {layout && (
                    <GameEngine
                        ref={(ref) => { engineRef.current = ref; }}
                        systems={[updatePhysics]}
                        entities={createWorld(layout.width, layout.height)}
                        style={styles_starwars.gameEngine}
                    />
                )}
            </View>
        </ImageBackground>
    );
}

export default Game;