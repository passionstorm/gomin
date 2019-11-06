<template>
  <div class="editor">
    <editor-content class="editor_content" :editor="editor"></editor-content>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
       
        <div class="row">
          <span v-if="isActive.table()">
            <button type="button" class="menubar__button" @click="commands.deleteTable">
              <icon name="delete_table" />
            </button>
            <button type="button" class="menubar__button" @click="commands.addColumnBefore">
              <icon name="add_col_before" />
            </button>
            <button type="button" class="menubar__button" @click="commands.addColumnAfter">
              <icon name="add_col_after" />
            </button>
            <button type="button" class="menubar__button" @click="commands.deleteColumn">
              <icon name="delete_col" />
            </button>
            <button type="button" class="menubar__button" @click="commands.addRowBefore">
              <icon name="add_row_before" />
            </button>
            <button type="button" class="menubar__button" @click="commands.addRowAfter">
              <icon name="add_row_after" />
            </button>
            <button type="button" class="menubar__button" @click="commands.deleteRow">
              <icon name="delete_row" />
            </button>
            <button type="button" class="menubar__button" @click="commands.toggleCellMerge">
              <icon name="combine_cells" />
            </button>
          </span>
        </div>
         <div class="row">
          <button @click="menuEmojiClick" type="button" class="menubar__button">
            <i>😁</i>
          </button>
          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <icon name="bold" />
          </button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <icon name="italic" />
          </button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <icon name="strike" />
          </button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <icon name="underline" />
          </button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <icon name="code" />
          </button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <icon name="paragraph" />
          </button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >H1</button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <icon name="ul" />
          </button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <icon name="ol" />
          </button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <icon name="quote" />
          </button>

          <button
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <icon name="code" />
          </button>

          <button
            type="button"
            class="menubar__button"
            @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
          >
            <icon name="table" />
          </button>
        </div>
        <button type="button" class="menubar__button" @click="commands.undo">
          <icon name="undo" />
        </button>
        <button type="button" class="menubar__button" @click="commands.redo">
          <icon name="redo" />
        </button>
      </div>
    </editor-menu-bar>
    <div class="menu_emoji" v-show="showEmoji">
      <span
        @click="appendEmoji($event.target.textContent)"
        class="emoji_icon"
        v-for="i in listEmoji"
        :key="i"
        v-html="i"
      ></span>
    </div>
    
  </div>
</template>

<script>
import icon from "@/components/widgets/Svg";
import SlotContent from '_c/SlotContent';
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  History
} from "tiptap-extensions";
export default {
  components: {
    EditorMenuBar,
    EditorContent,
    icon
  },
  computed: {
    buttons() {
      return this.field.buttons ? this.field.buttons : ["bold", "italic"];
    }
  },
  created() {
    // As soon as this component is created we'll emit our events
    // this.$emit('slot-content', SlotContent);
  },
  data() {
    return {
      editor: null,
      headingLevels: 3,
      linkUrl: null,
      linkMenuIsActive: false,
      emojRange: [
        [128512, 128580],
        [129296, 129301],
        [129312, 129327],
        [129488, 129488],
        [9986, 10160],
        [128640, 128704]
      ],
      listEmoji: [],
      showEmoji: false
    };
  },
  methods: {
    loadEmoji() {
      for (var i = 0; i < this.emojRange.length; i++) {
        var range = this.emojRange[i];
        for (var x = range[0]; x < range[1]; x++) {
          this.listEmoji.push("&#" + x + ";");
        }
      }
    },
    appendEmoji(text) {
      const transaction = this.editor.state.tr.insertText(text);
      this.editor.view.dispatch(transaction);
    },
    menuEmojiClick() {
      this.showEmoji = !this.showEmoji;
    }
  },
  mounted() {
    this.loadEmoji();
    this.editor = new Editor({
      onUpdate(state) {
        // console.log(state);
      },
      extensions: [
        new Blockquote(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new Table({
          resizable: true
        }),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new History()
      ],
      content: "<p></p><p></p><p></p><p></p>"
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style>
.menu_emoji {
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 1em;
}
.menu_emoji .emoji_icon {
  flex: 1 1 auto;
  width: 48px;
  cursor: pointer;
  font-size: 36px;
  text-align: center;
  height: 48px;
}



.menubar__button {
  font-weight: 700;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  background: transparent;
  border: 0;
  color: #000;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
}
.editor {
  margin-top: 20px;
  border: 1px solid #ced4da;
}
.menubar {
  padding: 1em;
  background: #f0f0f0;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
}

.menubar .row{
    flex-wrap: wrap;
}
.editor_content {
  background: #fff;
  overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
}
.editor_content .tableWrapper {
    margin: 1em 0;
    overflow-x: auto;
}
.editor_content table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;
}

.editor_content table td, .editor__content table th {
    min-width: 1em;
    border: 2px solid #ddd;
    padding: 3px 5px;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
}

.editor_content div:first-child {
  padding: 8px 12px;
  overflow: scroll;
}
.menubar__button i {
  font-size: 24px;
  font-style: normal;
}
</style>