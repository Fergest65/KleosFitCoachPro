import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from './src/lib/supabase';

export default function App() {
  const [tab, setTab] = useState('home');

  return (
    <LinearGradient colors={['#020302', '#070A06', '#020302']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 120 }}>
          {tab === 'home' && <Dashboard />}
          {tab === 'workout' && <Workouts />}
          {tab === 'nutrition' && <Nutrition />}
          {tab === 'progress' && <Progress />}
          {tab === 'chat' && <Chat />}
        </ScrollView>

        <View style={bottomBar}>
          <Nav label="Home" icon="⌂" active={tab === 'home'} onPress={() => setTab('home')} />
          <Nav label="Allenamenti" icon="⌁" active={tab === 'workout'} onPress={() => setTab('workout')} />
          <Nav label="Nutrizione" icon="◴" active={tab === 'nutrition'} onPress={() => setTab('nutrition')} />
          <Nav label="Progressi" icon="▥" active={tab === 'progress'} onPress={() => setTab('progress')} />
          <Nav label="Chat" icon="◌" active={tab === 'chat'} onPress={() => setTab('chat')} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Dashboard() {
  return (
    <>
      <View style={{ marginBottom: 24 }}>
        <Text style={logoK}>KLEOS</Text>
        <Text style={logoSub}>FITCOACH <Text style={{ color: lime }}>PRO</Text></Text>
      </View>

      <View style={headerRow}>
        <View>
          <Text style={title}>Ciao Mario 👋</Text>
          <Text style={muted}>Pronto a dare il massimo oggi?</Text>
        </View>
        <View style={avatar}>
          <Text style={{ color: '#000', fontWeight: '900' }}>M</Text>
        </View>
      </View>

      <Card>
        <Text style={limeSmall}>WORKOUT DEL GIORNO</Text>
        <Text style={big}>Spalle & Tricipiti</Text>
        <Text style={muted}>6 esercizi · 45 min</Text>
        <Button text="+ Inizia allenamento" />
      </Card>

      <Text style={section}>Riepilogo giornaliero</Text>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <MiniStat label="Calorie" value="2.140" sub="/ 2400 kcal" />
        <MiniStat label="Proteine" value="142 g" sub="/ 160 g" />
        <MiniStat label="Acqua" value="1,8 L" sub="/ 2,5 L" />
      </View>

      <Text style={section}>I tuoi progressi</Text>

      <Card>
        <Text style={muted}>Peso attuale</Text>
        <Text style={big}>78,4 kg</Text>
        <Text style={{ color: lime, fontWeight: '900' }}>↓ -1,3 kg</Text>

        <View style={chartLine}>
          {[20, 32, 25, 45, 38, 60, 54, 70].map((h, i) => (
            <View key={i} style={{ width: 22, height: h, backgroundColor: lime, borderRadius: 20 }} />
          ))}
        </View>
      </Card>

      <Card>
        <Text style={limeSmall}>PROSSIMO CHECK-IN</Text>
        <Text style={big}>12 Maggio 2026</Text>
        <Text style={muted}>Mancano 5 giorni</Text>
      </Card>
    </>
  );
}

function Workouts() {
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
      <Title title="Allenamenti" subtitle="Programma personalizzato." />

      {workouts.map((workout) => {
        const workoutExercises = exercises.filter((e) => e.workout_id === workout.id);

        return (
          <Card key={workout.id}>
            <Text style={limeSmall}>{workout.day}</Text>
            <Text style={big}>{workout.title}</Text>

            {workoutExercises.map((exercise) => (
              <View key={exercise.id} style={exerciseBox}>
                <Text style={whiteBold}>{exercise.name}</Text>
                <Text style={muted}>{exercise.sets} serie · {exercise.reps} reps</Text>
                <Text style={{ color: lime }}>Recupero: {exercise.rest}</Text>
              </View>
            ))}

            <Button text="Inizia allenamento" />
          </Card>
        );
      })}
    </>
  );
}

function Nutrition() {
  return (
    <>
      <Title title="Nutrizione" subtitle="Piano alimentare giornaliero." />
      <Card>
        <Text style={limeSmall}>RIEPILOGO</Text>
        <Text style={big}>2.140 kcal</Text>
        <Text style={muted}>Proteine 142g · Carbo 220g · Grassi 65g</Text>
      </Card>

      {['Colazione · Avena, banana, burro arachidi', 'Pranzo · Riso, pollo, verdure', 'Cena · Salmone, patate, broccoli'].map((m) => (
        <Card key={m}>
          <Text style={whiteBold}>{m}</Text>
        </Card>
      ))}
    </>
  );
}

function Progress() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    const { data } = await supabase
      .from('workout_history')
      .select('*')
      .order('completed_at', { ascending: false });

    setHistory(data || []);
  }

  return (
    <>
      <Title title="Progressi" subtitle="Monitora i tuoi risultati." />

      <Card>
        <Text style={muted}>Workout completati</Text>
        <Text style={big}>{history.length}</Text>
        <Text style={{ color: lime, fontWeight: '900' }}>Continua così 🔥</Text>
      </Card>

      <Text style={section}>Ultimi allenamenti</Text>

      {history.map((item) => (
        <Card key={item.id}>
          <Text style={whiteBold}>{item.workout_title}</Text>
          <Text style={muted}>{new Date(item.completed_at).toLocaleDateString()}</Text>
        </Card>
      ))}
    </>
  );
}

function Chat() {
  return (
    <>
      <Title title="AI Coach" subtitle="Il tuo coach sempre con te." />
      <Card>
        <Text style={whiteBold}>Coach Andrea</Text>
        <Text style={muted}>Perfetto Mario! Ricordati di idratarti e curare la tecnica 💪</Text>
      </Card>
      <Card>
        <Text style={whiteBold}>Tu</Text>
        <Text style={muted}>Ok grazie coach!</Text>
      </Card>
    </>
  );
}

function MiniStat({ label, value, sub }: any) {
  return (
    <View style={miniCard}>
      <Text style={mutedSmall}>{label}</Text>
      <Text style={miniValue}>{value}</Text>
      <Text style={mutedSmall}>{sub}</Text>
    </View>
  );
}

function Nav({ label, icon, active, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }}>
      <Text style={{ color: active ? lime : '#777', fontSize: 20 }}>{icon}</Text>
      <Text style={{ color: active ? lime : '#777', fontSize: 10, fontWeight: '800' }}>{label}</Text>
    </TouchableOpacity>
  );
}

function Title({ title, subtitle }: any) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={title}>{title}</Text>
      <Text style={muted}>{subtitle}</Text>
    </View>
  );
}

function Card({ children }: any) {
  return <View style={card}>{children}</View>;
}

function Button({ text }: any) {
  return (
    <TouchableOpacity style={button}>
      <Text style={{ color: '#050505', fontWeight: '900' }}>{text}</Text>
    </TouchableOpacity>
  );
}

const lime = '#B7FF00';

const logoK = { color: lime, fontSize: 34, fontWeight: '900' as const };
const logoSub = { color: 'white', fontSize: 13, letterSpacing: 4, fontWeight: '800' as const };
const title = { color: 'white', fontSize: 30, fontWeight: '900' as const };
const big = { color: 'white', fontSize: 26, fontWeight: '900' as const, marginTop: 8 };
const muted = { color: '#8B949E', marginTop: 6 };
const mutedSmall = { color: '#8B949E', fontSize: 11 };
const limeSmall = { color: lime, fontWeight: '900' as const, fontSize: 12 };
const whiteBold = { color: 'white', fontWeight: '900' as const, fontSize: 16 };
const section = { color: 'white', fontSize: 18, fontWeight: '900' as const, marginTop: 24, marginBottom: 12 };

const headerRow = { flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const, marginBottom: 22 };
const avatar = { width: 44, height: 44, borderRadius: 22, backgroundColor: lime, alignItems: 'center' as const, justifyContent: 'center' as const };

const card = {
  backgroundColor: '#101312',
  borderRadius: 24,
  padding: 18,
  borderWidth: 1,
  borderColor: '#242A31',
  marginBottom: 14,
};

const miniCard = {
  flex: 1,
  backgroundColor: '#101312',
  borderRadius: 18,
  padding: 14,
  borderWidth: 1,
  borderColor: '#242A31',
};

const miniValue = { color: 'white', fontSize: 20, fontWeight: '900' as const, marginTop: 8 };

const button = {
  backgroundColor: lime,
  borderRadius: 16,
  padding: 15,
  alignItems: 'center' as const,
  marginTop: 18,
};

const exerciseBox = {
  marginTop: 14,
  padding: 14,
  backgroundColor: '#050607',
  borderRadius: 16,
};

const chartLine = {
  height: 90,
  flexDirection: 'row' as const,
  alignItems: 'flex-end' as const,
  gap: 8,
  marginTop: 18,
};

const bottomBar = {
  flexDirection: 'row' as const,
  justifyContent: 'space-around' as const,
  backgroundColor: '#070907',
  paddingTop: 14,
  paddingBottom: 30,
  borderTopWidth: 1,
  borderTopColor: '#242A31',
};