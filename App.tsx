import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, ScrollView, Alert, TextInput } from 'react-native';import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from './src/lib/supabase';

export default function App() {
  const [tab, setTab] = useState('home');
  const [activeWorkout, setActiveWorkout] = useState<any>(null);
  const [activeExercises, setActiveExercises] = useState<any[]>([]);

  if (activeWorkout) {
    return (
      <WorkoutDetail
        workout={activeWorkout}
        exercises={activeExercises}
        onBack={() => setActiveWorkout(null)}
      />
    );
  }

  return (
    <LinearGradient colors={['#050607', '#101411', '#050607']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 120 }}>
          {tab === 'home' && <Home />}
          {tab === 'workout' && (
            <Workouts
              onStart={(workout: any, exercises: any[]) => {
                setActiveWorkout(workout);
                setActiveExercises(exercises);
              }}
            />
          )}
          {tab === 'nutrition' && <Nutrition />}
          {tab === 'progress' && <Progress />}
          {tab === 'chat' && <Chat />}
        </ScrollView>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#0B0E10', paddingTop: 14, paddingBottom: 30, borderTopWidth: 1, borderTopColor: '#242A31' }}>
          <Nav label="Home" active={tab === 'home'} onPress={() => setTab('home')} />
          <Nav label="Workout" active={tab === 'workout'} onPress={() => setTab('workout')} />
          <Nav label="Dieta" active={tab === 'nutrition'} onPress={() => setTab('nutrition')} />
          <Nav label="Progressi" active={tab === 'progress'} onPress={() => setTab('progress')} />
          <Nav label="Chat" active={tab === 'chat'} onPress={() => setTab('chat')} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Workouts({ onStart }: any) {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: workoutData } = await supabase.from('workouts').select('*');
    const { data: exerciseData } = await supabase.from('exercises').select('*');

    setWorkouts(workoutData || []);
    setExercises(exerciseData || []);
  }

  return (
    <>
      <Title title="Allenamenti" subtitle="Schede live da Supabase." />

      {workouts.map((workout) => {
        const workoutExercises = exercises.filter((e) => e.workout_id === workout.id);

        return (
          <Card key={workout.id}>
            <Text style={limeSmall}>{workout.day}</Text>
            <Text style={big}>{workout.title}</Text>

            {workoutExercises.map((exercise) => (
              <View key={exercise.id} style={{ marginTop: 14, padding: 14, backgroundColor: '#050607', borderRadius: 16 }}>
                <Text style={whiteBold}>{exercise.name}</Text>
                <Text style={muted}>{exercise.sets} serie · {exercise.reps} reps</Text>
                <Text style={{ color: '#B7FF00', marginTop: 4 }}>Recupero: {exercise.rest}</Text>
              </View>
            ))}

            <TouchableOpacity
              onPress={() => onStart(workout, workoutExercises)}
              style={{ backgroundColor: '#B7FF00', borderRadius: 18, padding: 16, alignItems: 'center', marginTop: 18 }}
            >
              <Text style={{ color: '#050607', fontWeight: '900' }}>Inizia workout</Text>
            </TouchableOpacity>
          </Card>
        );
      })}
    </>
  );
}

function WorkoutDetail({ workout, exercises, onBack }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);

  const currentExercise = exercises[currentIndex];

  useEffect(() => {
    let interval: any;

    if (running && timer > 0) {
      interval = setInterval(() => {
        setTimer((value) => value - 1);
      }, 1000);
    }

    if (timer === 0) {
      setRunning(false);
    }

    return () => clearInterval(interval);
  }, [running, timer]);

  async function saveWorkout() {
    const { error } = await supabase.from('workout_history').insert({
      workout_title: workout.title,
    });

    if (error) {
      console.log('Errore salvataggio workout:', error);
      Alert.alert('Errore', 'Workout completato, ma non salvato.');
    }
  }

  async function completeExercise() {
    const restSeconds = Number(String(currentExercise?.rest || '60').replace(/\D/g, '')) || 60;

    if (currentIndex < exercises.length - 1) {
      setTimer(restSeconds);
      setRunning(true);
      setCurrentIndex(currentIndex + 1);
    } else {
      setTimer(0);
      setRunning(false);

      await saveWorkout();

      Alert.alert('Workout completato!', 'Allenamento salvato nello storico.');
      onBack();
    }
  }

  return (
    <LinearGradient colors={['#050607', '#101411', '#050607']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, padding: 22 }}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: 20 }}>
          <Text style={{ color: '#B7FF00', fontWeight: '900' }}>← Torna agli allenamenti</Text>
        </TouchableOpacity>

        <Text style={limeSmall}>{workout.day}</Text>
        <Text style={{ color: 'white', fontSize: 32, fontWeight: '900', marginTop: 8 }}>
          {workout.title}
        </Text>

        <View style={{ backgroundColor: '#111418', borderRadius: 28, padding: 22, borderWidth: 1, borderColor: '#242A31', marginTop: 24 }}>
          <Text style={{ color: '#8B949E' }}>
            Esercizio {currentIndex + 1} di {exercises.length}
          </Text>

          <Text style={{ color: 'white', fontSize: 28, fontWeight: '900', marginTop: 12 }}>
            {currentExercise?.name}
          </Text>

          <Text style={{ color: '#8B949E', marginTop: 8 }}>
            {currentExercise?.sets} serie · {currentExercise?.reps} reps
          </Text>

          <View style={{ marginTop: 30, alignItems: 'center' }}>
            <Text style={{ color: '#B7FF00', fontSize: 52, fontWeight: '900' }}>
              {timer}s
            </Text>
            <Text style={{ color: '#8B949E' }}>Timer recupero</Text>
          </View>

          <TouchableOpacity
            onPress={completeExercise}
            style={{ backgroundColor: '#B7FF00', borderRadius: 18, padding: 18, alignItems: 'center', marginTop: 30 }}
          >
            <Text style={{ color: '#050607', fontWeight: '900', fontSize: 16 }}>
              Completa esercizio
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Nav({ label, active, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ color: active ? '#B7FF00' : '#8B949E', fontWeight: '900', fontSize: 12 }}>{label}</Text>
    </TouchableOpacity>
  );
}

function Home() {
  return (
    <>
      <Title title="Ciao Mario 👋" subtitle="Ecco il tuo piano di oggi." />
      <Card>
        <Text style={limeSmall}>WORKOUT DEL GIORNO</Text>
        <Text style={big}>Spalle & Tricipiti</Text>
        <Text style={muted}>6 esercizi · 45 minuti</Text>
        <Button text="Inizia allenamento" />
      </Card>
    </>
  );
}

function Nutrition() {
  return (
    <>
      <Title title="Nutrizione" subtitle="Piano alimentare." />
      <Card>
        <Text style={whiteBold}>Colazione</Text>
        <Text style={muted}>Avena + Banana + Whey</Text>
      </Card>
    </>
  );
}

function Progress() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    const { data, error } = await supabase
      .from('workout_history')
      .select('*')
      .order('completed_at', { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setHistory(data || []);
  }

  return (
    <>
      <Title title="Progressi" subtitle="Statistiche allenamenti." />

      <Card>
        <Text style={muted}>Workout completati</Text>
        <Text style={big}>{history.length}</Text>
        <Text style={{ color: '#B7FF00', fontWeight: '900' }}>
          Continua così 🔥
        </Text>
      </Card>

      <Text style={{ color: 'white', fontSize: 20, fontWeight: '900', marginTop: 20, marginBottom: 12 }}>
        Ultimi allenamenti
      </Text>

      {history.map((item) => (
        <Card key={item.id}>
          <Text style={whiteBold}>{item.workout_title}</Text>
          <Text style={muted}>
            {new Date(item.completed_at).toLocaleDateString()}
          </Text>
        </Card>
      ))}
    </>
  );
}

function Chat() {
  const [messages, setMessages] = useState<any[]>([
    { from: 'coach', text: 'Ciao Mario 👋 Come ti senti oggi?' },
  ]);

  const [input, setInput] = useState('');

  function sendMessage() {
    if (!input.trim()) return;

    const userMessage = {
      from: 'user',
      text: input,
    };

   const coachReply = {
  from: 'coach',
  text: 'Ottimo 🔥 ...',
};

    setMessages([...messages, userMessage, coachReply]);
    setInput('');
  }

  return (
    <>
      <Title title="AI Coach" subtitle="Chat motivazionale fitness." />

      {messages.map((message, index) => (
        <View
          key={index}
          style={{
            backgroundColor: message.from === 'user' ? '#B7FF00' : '#111418',
            borderRadius: 20,
            padding: 14,
            marginBottom: 12,
            alignSelf: message.from === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            borderWidth: message.from === 'user' ? 0 : 1,
            borderColor: '#242A31',
          }}
        >
          <Text
            style={{
              color: message.from === 'user' ? '#050607' : 'white',
              fontWeight: '800',
            }}
          >
            {message.text}
          </Text>
        </View>
      ))}

      <View
        style={{
          backgroundColor: '#111418',
          borderRadius: 24,
          padding: 14,
          borderWidth: 1,
          borderColor: '#242A31',
          marginTop: 10,
        }}
      >
        <TextInput
          placeholder="Scrivi al coach..."
          placeholderTextColor="#8B949E"
          value={input}
          onChangeText={setInput}
          style={{
            color: 'white',
            padding: 12,
            fontSize: 16,
          }}
        />

        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: '#B7FF00',
            borderRadius: 18,
            padding: 16,
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <Text style={{ color: '#050607', fontWeight: '900' }}>
            Invia
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function Title({ title, subtitle }: any) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ color: 'white', fontSize: 30, fontWeight: '900' }}>{title}</Text>
      <Text style={{ color: '#8B949E', marginTop: 6 }}>{subtitle}</Text>
    </View>
  );
}

function Card({ children }: any) {
  return (
    <View style={{ backgroundColor: '#111418', borderRadius: 24, padding: 18, borderWidth: 1, borderColor: '#242A31', marginBottom: 14 }}>
      {children}
    </View>
  );
}

function Button({ text }: any) {
  return (
    <TouchableOpacity style={{ backgroundColor: '#B7FF00', borderRadius: 18, padding: 16, alignItems: 'center', marginTop: 18 }}>
      <Text style={{ color: '#050607', fontWeight: '900' }}>{text}</Text>
    </TouchableOpacity>
  );
}

const limeSmall = { color: '#B7FF00', fontWeight: '900' as const, fontSize: 12 };
const big = { color: 'white', fontSize: 26, fontWeight: '900' as const, marginTop: 8 };
const muted = { color: '#8B949E', marginTop: 6 };
const whiteBold = { color: 'white', fontWeight: '900' as const, fontSize: 16 };