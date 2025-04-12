import { db } from "@/lib/firebase";
import { UserVote } from "@/types/RoomTypes";
import { collection, addDoc, doc } from "firebase/firestore";

export async function saveVote(vote: UserVote) {
    const userRef = doc(db, "users", vote.user.uid as string);
    const teamRef = doc(db, "teams", vote.team.id as string);
    const teamPlayerRef = doc(db, "teamPlayers", vote.teamPlayer.uid as string);

    const userVotesRef = collection(db, "userVotes");
    const body = {
        teamPlayer: teamPlayerRef,
        user: userRef,
        score: vote.score,
        roundIds: vote.roundIds,
        team: teamRef,
        roomId: vote.roomId,
    }
    try {
        await addDoc(userVotesRef, body);
    } catch (error) {
        console.error("Error saving vote: ", error);
        throw new Error("Failed to save vote");
    }
}
