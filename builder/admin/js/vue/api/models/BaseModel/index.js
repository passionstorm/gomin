import {Attr, Attribute, BelongsTo, Boolean, HasMany, HasOne, Increment, Model, MorphMany, MorphOne, MorphTo, Number} from '@vuex-orm/core';

export class BaseModel extends Model {
  static primaryKey = '_id';

  static fieldsKeys() {
    return Object.keys(this.fields());
  }

  static relationFields() {
    return this.fieldsKeys().reduce((list, field) => {
      let fieldAttribute = this.fields()[field];
      if (this.isFieldRelation(fieldAttribute)) {
        list.push(`${field}_id`);
        list.push(field);
      }
      return list;
    }, []);
  }

  static isFieldAttribute(field) {
    return (
        field instanceof Increment ||
        field instanceof Attr ||
        field instanceof String ||
        field instanceof Number ||
        field instanceof Boolean
    );
  }

  static isFieldRelation(field) {
    return (
        field instanceof BelongsTo ||
        field instanceof HasOne ||
        field instanceof HasMany ||
        field instanceof MorphTo ||
        field instanceof MorphOne ||
        field instanceof MorphMany
    );
  }

  skipField(field) {
    let shouldSkipField = false;
    this.getRelations().forEach(relation => {
      if (
          (relation instanceof BelongsTo || relation instanceof HasOne) &&
          relation.foreignKey === field
      ) {
        shouldSkipField = true;
        return false;
      }
      return true;
    });

    return shouldSkipField;
  }

  /**
   * Determines if we should eager load (means: add as a field in the graphql query) a related entity. belongsTo or
   * hasOne related entities are always eager loaded. Others can be added to the `eagerLoad` array of the model.
   *
   * @param {string} fieldName Name of the field
   * @param {Attribute} field Relation field
   * @param {Model} relatedModel Related model
   * @returns {boolean}
   */
  shouldEagerLoadRelation(fieldName, field, relatedModel) {
    if (field instanceof HasOne || field instanceof BelongsTo || field instanceof MorphOne) {
      return true;
    }

    const eagerLoadList = this.eagerLoad || [];
    return (
        eagerLoadList.find(n => {
          return n === relatedModel.singularName || n === relatedModel.pluralName || n === fieldName;
        }) !== undefined
    );
  }

  getRelations() {
    return this.fields().reduce(function(relations, field, name,) {
          if (!this.isFieldAttribute(field)) {
            relations.set(name, field);
          }
          return relations;
          }, []);
  }
}
