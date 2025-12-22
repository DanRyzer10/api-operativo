import { END, MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ChatToolProvide } from "../Domain/ChatToolProvider";
import { ConversationState } from "../Domain/ConversationState";

export class AiAgentGraph {
    constructor(private tools:ChatToolProvide){}

    public createGraph(){
        async function  greetUser(state:ConversationState) {
            return {
                messages: [...state.messages],
                stepCount: state.stepCount +1
            }
        }
        const workflow = new StateGraph(MessagesAnnotation);

        workflow.addNode("fetchInfo", async (state) => {
            const info = await this.tools.getUserInfo(state.messages.toLocaleString());
            return {}
        });

        workflow.setEntryPoint("fetch_info");
        workflow.addEdge("fetch_info",END);

        return workflow.compile();
    }
}