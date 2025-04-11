import { db } from "@/lib/firebase";
import { RoomVote } from "@/types/RoomTypes";
import { collection, addDoc, doc } from "firebase/firestore";

export async function saveVote(vote: RoomVote) {
    const userRef = doc(db, "users", vote.user.uid as string);
    const teamRef = doc(db, "teams", vote.team.id as string);
    const teamPlayerRef = doc(db, "teamPlayers", vote.teamPlayer.uid as string);

    const votesRef = collection(db, "rooms", vote.roomId, "votes");
    const body = {
        teamPlayer: teamPlayerRef,
        user: userRef,
        score: vote.score,
        roundIds: vote.roundIds,
        team: teamRef,
        roomId: vote.roomId,
    }
    try {
        await addDoc(votesRef, body);
    } catch (error) {
        console.error("Error saving vote: ", error);
        throw new Error("Failed to save vote");
    }
}
